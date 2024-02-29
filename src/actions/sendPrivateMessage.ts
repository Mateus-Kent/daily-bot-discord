import { GuildMember } from 'discord.js'

export async function sendPrivateMessage(member: GuildMember, message: string) {
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
