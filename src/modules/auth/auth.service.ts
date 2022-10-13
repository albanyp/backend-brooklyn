import { Injectable, Logger } from '@nestjs/common'
import { SignUpDto } from './dtos/sign-up.dto'

@Injectable()
export class AuthService {
  findAll(): string {
    return 'hello world service'
  }

  signUp(signUpDto: SignUpDto): SignUpDto {
    Logger.log('email', signUpDto.email)
    Logger.log('password', signUpDto.password)
    return signUpDto
  }
}