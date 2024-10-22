import { Client, GuildMember, Message, Partials } from 'discord.js'
import { env } from './env'
import { handleCommand, scheduleMessages } from './actions'

interface DailyReport {
  user: string;
  report: string;
}

export let reports = [] as { member: string; step: string }[]
export let dailyReports = [] as DailyReport[]

export const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'DirectMessages',
    'GuildMembers',
    'MessageContent',
    'DirectMessageReactions',
    'DirectMessageTyping',
  ],
  partials: [Partials.Channel, Partials.Message],
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

client.on('messageCreate', async (message: Message) => {
  if (message.channel.type == 1) { // Verifica se é mensagem direta
    const memberIndex = reports.findIndex((report) => {
      return report.member === message.author.id
    })
    
    if (memberIndex === -1) {
      return
    }
    
    const member = reports[memberIndex]
    if (member.step === 'pending') {
      reports[memberIndex] = { ...member, step: 'submitted' }
      
      // Adiciona o novo relatório ao array de dailyReports
      dailyReports.push({
        user: message.author.username, // ou message.author.tag para incluir o discriminador
        report: message.content
      })
      
      message.reply('Relatório reportado com sucesso! Obrigado pelo seu daily.')
      
      // Opcional: Log para verificar os relatórios
      console.log('Daily Reports:', dailyReports)
    }
  }
})

client.on('messageCreate', (message: Message) => {
  console.log(message.channel.type)
  if (message.author.bot) return // Ignorar mensagens de outros bots

  if (message.content.startsWith(prefix)) {
    handleCommand(message)
  }
})

client.on('guildCreate', async (guild) => {
  await guild.members.fetch() //Busca todos os membros quando o bot entra em uma nova guilda
})

client.on('error', console.error)

client.login(TOKEN)
