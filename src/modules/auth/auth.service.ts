import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
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
dotenv.config()

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
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
    const user = await this.validateUser(logInDto)
    const data = { email: logInDto.email, id: user.id }
    return {
      accessToken: this.jwtService.sign(data, { expiresIn: '7200s'} ),
      user
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash
  }
}