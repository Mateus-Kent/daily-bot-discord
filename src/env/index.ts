import { z } from 'zod'

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "A env 'DATABASE_HOST' da sala é necessária."),
  SERVER_ID: z.string().min(1, "A env 'SERVER_ID' da sala é necessária."),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Variáveis de ambiente inválidas.', _env.error.format())

  throw new Error('Variáveis de ambiente inválidas.')
}

export const env = _env.data
