import * as dotenv from 'dotenv'
dotenv.config()

export const PAGE_SIZE = 100
export const jwtConstants = {
  secret: process.env.AUTH_SECRET 
}