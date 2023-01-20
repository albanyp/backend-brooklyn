import { User } from "../../../entity/user"

export interface UserPatchDto {
  // key: 'firstName'| 'lastName' | 'email' | 'nickname' | 'birthdate' | 'logoUrl'
  key: keyof User
  value: string
}