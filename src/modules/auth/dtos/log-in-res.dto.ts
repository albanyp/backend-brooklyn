import { User } from "../../../entity/user"

export class LogInResDto {
  accessToken: string
  user: User
}