import { Client, GuildMember, Message } from 'discord.js'
import { env } from './env'
import cron from 'node-cron'

const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'DirectMessages',
    'GuildMembers',
    'MessageContent',
  ],
})

const TOKEN = env.BOT_TOKEN
const prefix = '!' // Prefixo para os comandos

const dailyConfig = {
  enabled: true,
  schedule: '58 15 * * 1-5', // Padrão: 15:51 de segunda a sexta-feira
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
  scheduleMessages() // Agende as mensagens diárias
})

client.on('messageCreate', (message: Message) => {
  if (message.author.bot) return // Ignorar mensagens de outros bots

  if (message.content.startsWith(prefix)) {
    handleCommand(message)
  }
})

function handleCommand(message: Message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (command === 'daily') {
    setDailySchedule(message, args[0])
  }
}

function setDailySchedule(message: Message, time: string | undefined) {
  if (!message.member || !message.member.permissions.has('Administrator')) {
    message.reply('Você não tem permissão para executar este comando.')
    return
  }

  if (!time || !isValidTime(time)) {
    message.reply('Formato de hora inválido. Use !daily {HH:mm}')
    return
  }

  // Atualize as configurações de horário
  dailyConfig.enabled = true
  dailyConfig.schedule = convertToCron(time)

  message.reply(
    `Mensagem diária agendada para ${time} de segunda a sexta-feira.`
  )

  scheduleMessages()
  console.log('aaaaaaa', dailyConfig.schedule)
}

function isValidTime(time: string): boolean {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/ // Formato HH:mm
  return regex.test(time)
}

function convertToCron(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${minutes} ${hours} * * 1-5`
}

function scheduleMessages() {
  if (dailyConfig.enabled) {
    // Agende a execução da função startSendingMessages com base nas configurações
    cron.schedule(dailyConfig.schedule, () => {
      startSendingMessages()
    })
  }
}

client.on('guildCreate', async (guild) => {
  await guild.members.fetch() // Fetch all members when the bot joins a new guild
})

async function startSendingMessages() {
  client.guilds.cache.forEach(async (guild) => {
    await guild.members.fetch() // Fetch members for all guilds on startup
    guild.members.cache.forEach((member) => {
      if (member.id !== client.user?.id) {
        sendPrivateMessage(
          member,
          'Olá eu sou daily-bot, por favor me diga oque você fez hoje?'
        )
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

client.on('error', console.error)

client.login(TOKEN)
