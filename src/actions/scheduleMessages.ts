import cron from 'node-cron'
import { dailyConfig } from '../bot'
import { startSendingMessages } from './startSendingMessages'

export function scheduleMessages() {
  if (dailyConfig.enabled) {
    // Agende a execução da função startSendingMessages com base nas configurações
    cron.schedule(dailyConfig.schedule, () => {
      startSendingMessages()
    })
  }
}
