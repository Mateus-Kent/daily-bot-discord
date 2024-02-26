interface UserFlagsBitField {
  bitfield: number
}

export interface Bot {
  id: string
  bot: boolean
  system: boolean
  flags: UserFlagsBitField
  username: string
  globalName: string | null
  discriminator: string
  avatar: string | null
  banner?: string | undefined
  accentColor?: string | undefined
  avatarDecoration: string | null
  verified: boolean
  mfaEnabled: boolean
}
