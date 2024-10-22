import { Message } from 'discord.js'
import { dailyConfig } from '../bot'
import { scheduleMessages } from './scheduleMessages'

export function setDailySchedule(message: Message, time: string | undefined) {
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
}

function isValidTime(time: string): boolean {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/ // Formato HH:mm
  return regex.test(time)
}

function convertToCron(time: string): string {
  const [hours, minutes] = time.split(':')
  return `${minutes} ${hours} * * 1-5`
}
