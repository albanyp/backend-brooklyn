import { User } from "../../../entity/User"

export class LogInResDto {
  accessToken: string
  user: User
}