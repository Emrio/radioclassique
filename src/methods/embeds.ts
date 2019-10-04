import { RichEmbed, Message } from 'discord.js'
import utils from '../utils'

export type Field = { title: string, body: string, blank?: false, inline?: boolean } | { blank: true, inline?: boolean }

export function generateEmbed (fields: Field[]): RichEmbed {
  const embed = new RichEmbed({
    footer: {
      text: 'Radio Classique'
    },
    color: 12258336,
    thumbnail: { url: utils.config.radioclassique.icon }
  })
  fields.forEach(field => {
    if (field.blank === true) {
      embed.addBlankField(field.inline)
    } else {
      embed.addField(field.title, field.body, field.inline)
    }
  })
  return embed
}

export function sendEmbed (message: Message, fields: Field[]): Promise<Message | Message[]> {
  return message.channel.send({ embed: generateEmbed(fields) })
}
