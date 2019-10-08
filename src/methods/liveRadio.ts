import { PassThrough } from 'stream'
import { VoiceChannel, StreamDispatcher } from 'discord.js'
import request from 'request'
import utils from '../utils'
const debug = utils.debug('liveRadio')

export const radio = new PassThrough()
export const currentBroadcast = { author: 'N/A', title: 'N/A', time: 'N/A', speed: -1 }

export async function playRadio (channel: VoiceChannel): Promise<StreamDispatcher> {
  debug('Stream started at %o / %o', channel.guild.id, channel.id)
  return channel.connection.playStream(radio)
    .on('end', (reason) => {
      debug('Stream ended at %o / %o - Reason: %o', channel.guild.id, channel.id, reason)
      if (reason !== 'user') {
        debug('Reconnecting to stream...')
        stopBroadcast(channel) // XXX: May be unneccessary
        playRadio(channel)
      }
    })
    .on('error', console.error)
}

export async function stopBroadcast (channel: VoiceChannel): Promise<void> {
  return channel.connection.dispatcher.end()
}

async function updateCurrentBroadcast () {
  request.get(utils.config.radioclassique.updates)
    .on('error', console.error)
    .on('data', data => {
      const update = JSON.parse(data.toString())
      currentBroadcast.author = update.auteur || 'N/A'
      currentBroadcast.title = update.titre ? update.titre.replace('%\\n', '\n') : 'N/A'
      currentBroadcast.time = update.duree || 'N/A'
    })
}

async function start () {
  let curDownloadedContentLength = 0
  let lastLengthMeasures = [ 0 ]
  setInterval(() => {
    lastLengthMeasures.push(curDownloadedContentLength)
    // only keep the latest measures
    lastLengthMeasures = lastLengthMeasures.slice(-5 / utils.config.updateSpeed)
    // compute average speed of the latest measures
    currentBroadcast.speed = lastLengthMeasures.reduce((a, c) => a + c, 0) / (lastLengthMeasures.length * utils.config.updateSpeed)
    curDownloadedContentLength = 0
  }, utils.config.updateSpeed * 1000)

  while (true) {
    debug('Starting service...')
    // this promise won't resolve until the connection to the radio crashes
    await new Promise((resolve) => {
      try {
        request.get(utils.config.radioclassique.liveradio)
          .on('data', data => {
            curDownloadedContentLength += data.length
          })
          .on('error', (err) => {
            console.error(err)
            debug('Fatal error: restarting service...')
            return setTimeout(resolve, 1000)
          })
          .pipe(radio)
      } catch (err) {
        console.error(err)
        debug('Fatal error: restarting service...')
        setTimeout(resolve, 1000)
      }
    })
  }
}

start()
setInterval(() => updateCurrentBroadcast().catch(console.error), utils.config.updateInterval)
updateCurrentBroadcast()
