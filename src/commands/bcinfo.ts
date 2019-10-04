import { Message } from 'discord.js'
import { sendEmbed } from '../methods/embeds'
import { currentBroadcast } from '../methods/liveRadio'

export async function bcinfo (message: Message): Promise<void> {
  sendEmbed(message, [
    {
      title: `**Currently playing** (${currentBroadcast.time})`,
      body: `**${currentBroadcast.author}**\n${currentBroadcast.title}`,
      inline: true
    },
    { blank: true, inline: true }
  ])
}
