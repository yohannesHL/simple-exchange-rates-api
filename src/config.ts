import dotenv from 'dotenv'
import { IConfig } from './lib/interfaces'

dotenv.config()

const env = process.env

export const config: IConfig = {
  port: parseInt(env.HTTP_PORT || '') || 3000,
}

export default config
