import { Message } from 'discord.js'
import { sendEmbed } from '../methods/embeds'
import { format } from '../methods/format'
import utils from '../utils'

export async function help (message: Message): Promise<void> {
  sendEmbed(message, format(utils.config.messages.help, { prefix: utils.config.defaults.prefix }))
}
