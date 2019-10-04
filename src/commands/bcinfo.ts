import { Message } from 'discord.js'
import { sendEmbed } from '../methods/embeds'
import { currentBroadcast } from '../methods/liveRadio'
import { format } from '../methods/format'
import utils from '../utils'

export async function bcinfo (message: Message): Promise<void> {
  sendEmbed(message, format(utils.config.messages.bcinfo, currentBroadcast))
}
