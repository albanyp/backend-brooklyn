import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'
import { SignUpDto } from './dtos/sign-up.dto'
import { v4 as uuidv4 } from 'uuid'  
import * as bcrypt from 'bcrypt'
import { LogInDto } from './dtos/log-in.dto'
import { JwtService } from '@nestjs/jwt';

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

  async signUp(signUpDto: SignUpDto): Promise<SignUpDto> {
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

  async validateUser(LogInDto: LogInDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: LogInDto.email
      }
    })
    const isMatch = await bcrypt.compare(LogInDto.password, user.password)
    if(isMatch) {
      return user
    }
  }

  async login(LogInDto: LogInDto) {
    if(this.validateUser(LogInDto)) {
      const data = { email: LogInDto.email, password: LogInDto.password }
      return {
        access_token: this.jwtService.sign(data)
      }
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    return hash
  }
}