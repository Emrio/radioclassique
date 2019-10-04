import { PassThrough } from 'stream'
import { VoiceChannel, StreamDispatcher } from 'discord.js'
import request from 'request'
import utils from '../utils'
const debug = utils.debug('liveRadio')

export const radio = new PassThrough()
export const currentBroadcast = { author: 'N/A', title: 'N/A', time: 'N/A' }

export async function playRadio (channel: VoiceChannel): Promise<StreamDispatcher> {
  debug('Stream started at %o / %o', channel.guild.id, channel.id)
  return channel.connection.playStream(radio)
    .on('end', (reason) => debug('Stream ended at %o / %o - Reason: %o', channel.guild.id, channel.id, reason))
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

request.get(utils.config.radioclassique.liveradio)
  .on('error', console.error)
  .pipe(radio)

setInterval(() => updateCurrentBroadcast().catch(console.error), utils.config.updateInterval)
updateCurrentBroadcast()
