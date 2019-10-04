import { Message } from 'discord.js'
import { Bot } from '../Bot'
import { sendEmbed } from '../methods/embeds'
import { parseTimelapse } from '../methods/parseTimelapse'
import utils from '../utils'

export async function info (message: Message): Promise<void> {
  sendEmbed(message, [
    {
      title: '**Radio Classique**',
      body: `
        Bot Discord pour écouter Radio Classique
        [Radio Classique](${utils.config.radioclassique.website})
        [GitHub](https://github.com/TheEmrio/discord-radioclassique)`
    },
    {
      title: '**Information technique**',
      body: `
        Libraries: ${utils.dependencies.map(dep => `\`${dep}\``)}
        Uptime: **${parseTimelapse(Bot.uptime)}**
        Deployed version: **v${utils.packageJson.version}**`
    }
  ])
}
