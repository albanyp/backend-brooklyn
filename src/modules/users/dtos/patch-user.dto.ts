import { User } from "../../../entity/User"

export interface PatchUserDto {
  // key: 'firstName'| 'lastName' | 'email' | 'nickname' | 'birthdate' | 'logoUrl'
  key: keyof User
  value: string
}