import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/sign-up.dto'
import { LogInDto } from './dtos/log-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  findAll(): string {
    return this.authService.findAll()
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post('login')
  async login(@Body() LogInDto: LogInDto): Promise<{'access_token': string}> {
    return this.authService.login(LogInDto)
  }
}
