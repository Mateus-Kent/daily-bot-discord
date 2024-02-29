import { Client, GuildMember, Message } from 'discord.js'
import { env } from './env'

import { handleCommand, scheduleMessages } from './actions'

export const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'DirectMessages',
    'GuildMembers',
    'MessageContent',
  ],
})

const TOKEN = env.BOT_TOKEN
export const prefix = '!'

export const dailyConfig = {
  enabled: true,
  schedule: '58 15 * * 1-5',
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
  scheduleMessages()
})

client.on('messageCreate', (message: Message) => {
  if (message.author.bot) return // Ignorar mensagens de outros bots

  if (message.content.startsWith(prefix)) {
    handleCommand(message)
  }
})

client.on('guildCreate', async (guild) => {
  await guild.members.fetch() // Fetch all members when the bot joins a new guild
})

client.on('error', console.error)

client.login(TOKEN)
