import { Message } from 'discord.js'
import { Bot } from '../Bot'
import { sendEmbed } from '../methods/embeds'
import { playRadio } from '../methods/liveRadio'
import utils from '../utils'

export async function join (message: Message): Promise<void> {
  if (message.guild.voiceConnection) {
    sendEmbed(message, utils.config.messages.alreadyConnected)
    return
  }
  const voiceChannel = message.member.voiceChannel
  if (!voiceChannel) {
    sendEmbed(message, utils.config.messages.noVoiceChannel)
    return
  }
  const permissions = voiceChannel.permissionsFor(Bot.user)
  if (!permissions) {
    sendEmbed(message, utils.config.messages.error)
    return
  } else if (!permissions.has('CONNECT')) {
    sendEmbed(message, utils.config.messages.noPermissionToConnect)
    return
  } else if (!permissions.has('SPEAK')) {
    sendEmbed(message, utils.config.messages.noPermissionToPlay)
    return
  } else if (!voiceChannel.joinable) {
    sendEmbed(message, utils.config.messages.cantJoin)
    return
  }

  await voiceChannel.join()
  playRadio(voiceChannel)
  // TODO: Set volume
  sendEmbed(message, utils.config.messages.joined)
}
