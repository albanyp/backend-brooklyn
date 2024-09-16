import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'
import { SignUpDto } from './dtos/sign-up.dto'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { LogInReqDto } from './dtos/log-in-req.dto'
import { JwtService } from '@nestjs/jwt';
import { LogInResDto } from './dtos/log-in-res.dto'
import * as dotenv from 'dotenv'
import { UsersService } from '../users/users.service'
dotenv.config()

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UsersService
  ){}

  findAll(): string {
    return 'hello world service'
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(signUpDto)
      newUser.id = uuidv4()
      newUser.password = await this.encryptPassword(newUser.password)
      await this.userRepository.save(newUser)
      return newUser
    } catch {
      throw new BadRequestException()
    }
  }

  async validateUser(logInReqDto: LogInReqDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: logInReqDto.email
      }
    })

    if(user) {
      const isMatch = await bcrypt.compare(logInReqDto.password, user.password)
      if (isMatch) {
        return user
      }
    }

    throw new NotFoundException()
  }

  async login(logInDto: LogInReqDto): Promise<LogInResDto> {
    Logger.log(logInDto)
    const user = await this.validateUser(logInDto)
    const data = { email: logInDto.email, id: user.id }
    let expirationTime = '7200s'
    if(logInDto.rememberMe) expirationTime = '7d'
    return {
      accessToken: this.jwtService.sign(data, { expiresIn: expirationTime} ),
      user
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash
  }

  async forgetPassword(email: string) {
    const user = await this.userService.findUsers({email})
    Logger.log('user', user)
  }
}