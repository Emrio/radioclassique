import { Message } from 'discord.js'
import { Bot } from '../Bot'
import { sendEmbed } from '../methods/embeds'
import { parseTimelapse, parseDataSize } from '../methods/parse'
import { format } from '../methods/format'
import { currentBroadcast } from '../methods/liveRadio'
import utils from '../utils'

export async function info (message: Message): Promise<void> {
  sendEmbed(message, format(utils.config.messages.info, {
    website: utils.config.radioclassique.website,
    dependencies: utils.dependencies.map(dep => `\`${dep}\``),
    uptime: parseTimelapse(Bot.uptime),
    version: utils.packageJson.version,
    memcur: utils.processInfo().memory.current,
    memmax: utils.processInfo().memory.max,
    curdlspeed: parseDataSize(currentBroadcast.speed)
  }))
}
