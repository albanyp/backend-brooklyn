import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dtos/sign-up.dto'

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
}

// http://localhost:3000/auth - GET
// http://localhost:3000/sign-up - POST