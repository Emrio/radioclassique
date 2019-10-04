import { Message } from 'discord.js'
import { join } from './join'
import { leave } from './leave'
import { info } from './info'

export type CommandHandler = (message: Message) => Promise<void>

export const commands: { [cmd in Command]: CommandHandler } = { join, leave, info }

export type Command = 'join' | 'leave' | 'info'
export const Command: Command[] = [ 'join', 'leave', 'info' ]
