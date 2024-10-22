import { EmbedBuilder, Message } from 'discord.js'
import { setDailySchedule } from './setDailySchedule'
import { dailyReports, prefix } from '../bot'

const commands = {
  '!daily': 'Inicia o processo de submissão do daily report',
  '!reports': 'Mostra todos os reports da daily',
  '!status': 'Verifica o status do seu daily atual',
  '!commands': 'Lista todos os comandos disponíveis do bot',
};

export async function handleCommand(message: Message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift()?.toLowerCase()

  if (command === 'daily') {
    setDailySchedule(message, args[0])
  } 
  
  if (command === 'reports') {
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

  if(command === 'commands') {
    const commandsList = Object.entries(commands)
      .map(([command, description]) => `**${command}:** ${description}`)
      .join('\n');

    const embedResponse = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('📋 Comandos Disponíveis')
      .setDescription(commandsList)
      .setFooter({ 
        text: 'Use !help para mais informações sobre cada comando' 
      });

    await message.reply({ embeds: [embedResponse] });
  }
}
