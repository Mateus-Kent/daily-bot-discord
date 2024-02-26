import { Client, GuildMember } from 'discord.js'
import { env } from './env'
import cron from 'node-cron'

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages', 'GuildMembers'],
})

const TOKEN = env.BOT_TOKEN

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
  scheduleMessages()
})

function scheduleMessages() {
  cron.schedule('08 16 * * 1-5', () => {
    startSendingMessages()
  })
}

client.on('guildCreate', async (guild) => {
  await guild.members.fetch() // Fetch all members when the bot joins a new guild
})

async function startSendingMessages() {
  client.guilds.cache.forEach(async (guild) => {
    await guild.members.fetch() // Fetch members for all guilds on startup
    guild.members.cache.forEach((member) => {
      if (member.id !== client.user?.id) {
        sendPrivateMessage(member, 'Oi!')
      }
    })
  })
}

async function sendPrivateMessage(member: GuildMember, message: string) {
  try {
    const dmChannel = await member.createDM()
    await dmChannel.send(message)
  } catch (error) {
    console.error(
      `Error sending a private message to ${member.user.tag}:`,
      error
    )
  }
}

client.login(TOKEN)
