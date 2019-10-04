import { Message } from 'discord.js'
import { sendEmbed } from '../methods/embeds'
import { currentBroadcast } from '../methods/liveRadio'

export async function bcinfo (message: Message): Promise<void> {
  sendEmbed(message, [
    {
      title: `:musical_note: **Currently playing** (${currentBroadcast.time})`,
      body: `**${currentBroadcast.author}**\n${currentBroadcast.title}`
    }
  ])
}
