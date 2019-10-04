import { Message } from 'discord.js'
import { sendEmbed } from '../methods/embeds'
import { stopBroadcast } from '../methods/liveRadio'
import utils from '../utils'

export async function stop (message: Message): Promise<void> {
  if (!message.guild.voiceConnection) {
    sendEmbed(message, utils.config.messages.notConnected)
    return
  }
  const voiceChannel = message.member.voiceChannel
  if (!voiceChannel) {
    sendEmbed(message, utils.config.messages.noVoiceChannel)
    return
  }
  if (voiceChannel.id !== message.guild.voiceConnection.channel.id) {
    sendEmbed(message, utils.config.messages.notInMyChannel)
    return
  }
  if (!voiceChannel.connection.dispatcher) {
    sendEmbed(message, utils.config.messages.notBroadcasting)
    return
  }

  stopBroadcast(voiceChannel)

  sendEmbed(message, utils.config.messages.broadcastStopped)
}
