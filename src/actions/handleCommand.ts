import { Message } from 'discord.js'
import { setDailySchedule } from './setDailySchedule'
import { dailyReports, prefix } from '../bot'

export function handleCommand(message: Message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (command === 'daily') {
    setDailySchedule(message, args[0])
  } else if (command === 'reports') {
    // Verifica se o usuário tem permissão de administrador
    if (!message.member?.permissions.has('Administrator')) {
      message.reply('Você não tem permissão para ver os relatórios.')
      return
    }

    if (dailyReports.length === 0) {
      message.reply('Não há relatórios para mostrar.')
      return
    }

    // Formata os relatórios para exibição
    const reportsText = dailyReports
      .map(report => `**${report.user}**: ${report.report}`)
      .join('\n\n')

    message.reply(`**Daily Reports:**\n\n${reportsText}`)
  }
}
