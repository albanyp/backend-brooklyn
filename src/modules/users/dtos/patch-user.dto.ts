import { User } from "../../../entity/user"

export interface PatchUserDto {
  // key: 'firstName'| 'lastName' | 'email' | 'nickname' | 'birthdate' | 'logoUrl'
  key: keyof User
  value: string
}