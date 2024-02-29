import { Message } from 'discord.js'
import { setDailySchedule } from './setDailySchedule'
import { prefix } from '../bot'

export function handleCommand(message: Message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (command === 'daily') {
    setDailySchedule(message, args[0])
  }
}
