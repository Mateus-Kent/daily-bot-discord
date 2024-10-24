import { client, reports } from '../bot'
import { sendPrivateMessage } from './sendPrivateMessage'

export async function startSendingMessages() {
  client.guilds.cache.forEach(async (guild) => {
    await guild.members.fetch() //Busca membros para todas as guildas na inicialização
    guild.members.cache.forEach((member) => {
      if (member.id !== client.user?.id) {
        sendPrivateMessage(
          member,
          'Olá eu sou daily-bot, por favor me diga oque você fez hoje?'
        )
        reports.push({ member: member.id, step: 'caguei' })
      }
    })
  })
}
