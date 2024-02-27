import {
  DMChannel,
  Guild,
  GuildMember,
  NewsChannel,
  Snowflake,
  TextChannel,
  User,
} from 'discord.js'

export interface Message {
  id: Snowflake // ID única da mensagem
  content: string // Conteúdo da mensagem
  author: User // Autor da mensagem (representado pela interface User)
  member?: GuildMember // Membro relacionado à mensagem (se a mensagem estiver em um servidor)
  guild?: Guild // Servidor (Guild) relacionado à mensagem
  channel: TextChannel | DMChannel | NewsChannel // Canal em que a mensagem foi enviada
  createdTimestamp: number // Timestamp de quando a mensagem foi criada
  // ... outras propriedades e métodos
}
