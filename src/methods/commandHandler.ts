import { Client, Message } from 'discord.js'
import { sendEmbed } from './embeds'
import { commands, Command } from '../commands'
import utils from '../utils'

export function setup (bot: Client): void {
  bot.on('message', commandHandler)
}

function commandHandler (message: Message): void {
  if (!message || message.author.bot || !message.content) return
  const guildPrefix = '$' // TODO: Get with db
  if (!message.content.startsWith(guildPrefix)) return
  const command = message.content.substring(guildPrefix.length).split(' ')[0]
  if (Object.keys(commands).includes(command)) {
    commands[command as Command](message)
      .catch(err => {
        console.error(err)
        return sendEmbed(message, utils.config.messages.error)
      })
      .catch(console.error)
  }
}
