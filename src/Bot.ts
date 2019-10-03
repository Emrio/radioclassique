import { Client } from 'discord.js'
import utils from './utils'
const debug = utils.debug('bot')

export const Bot = new Client()

Bot.on('ready', () => {
  debug('I am ready!')
  Bot.user.setActivity('Radio Classique', { type: 'LISTENING' })
})

Bot.on('error', err => {
  if ([ 'ENOTFOUND', 'ETIMEDOUT', 'ECONNRESET' ].includes((err as any).error.code)) {
    return debug('Connection lost. Reconnecting...')
  }
  console.error('Outch, we got an error!', err)
})

Bot.login(utils.config.token)
