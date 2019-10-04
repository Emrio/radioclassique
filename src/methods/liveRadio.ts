import { PassThrough } from 'stream'
import { VoiceChannel, StreamDispatcher } from 'discord.js'
import request from 'request'
import utils from '../utils'

export const radio = new PassThrough()

request.get(utils.config.radioclassique.liveradio)
  .on('error', console.error)
  .pipe(radio)

export async function playRadio (channel: VoiceChannel): Promise<StreamDispatcher> {
  return channel.connection.playStream(radio)
    .on('end', () => console.log('end'))
    .on('error', console.error)
}
