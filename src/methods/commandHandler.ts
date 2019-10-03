import { Client, Message } from 'discord.js'
import { commands, Command } from '../commands'

export function setup (bot: Client): void {
  bot.on('message', commandHandler)
}

function commandHandler (message: Message): void {
  if (!message || message.author.bot || !message.content) return
  const guildPrefix = '$' // TODO: Get with db
  if (!message.content.startsWith(guildPrefix)) return
  const command = message.content.substring(guildPrefix.length).split(' ')[0]
  console.log(command, Object.keys(commands))
  if (Object.keys(commands).includes(command)) {
    commands[command as Command](message)
  }
}
