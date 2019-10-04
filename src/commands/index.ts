import { Message } from 'discord.js'
import { join } from './join'
import { leave } from './leave'
import { info } from './info'
import { bcinfo } from './bcinfo'

export type CommandHandler = (message: Message) => Promise<void>

export const commands: { [cmd in Command]: CommandHandler } = { join, leave, info, bcinfo }

export type Command = 'join' | 'leave' | 'info' | 'bcinfo'
export const Command: Command[] = [ 'join', 'leave', 'info', 'bcinfo' ]
