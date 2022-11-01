import { Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/User'
import { FindUsersDto } from './find-users.dto'
import { PAGE_SIZE } from '../../constants'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id: id })
    return user
  }

  async getUsers(@Query() params?: FindUsersDto) {
    // const page = params && params.pageNumber ? params.pageNumber : 1
    const page = params?.pageNumber || null
    const size = params?.pageSize || PAGE_SIZE

    if (page) {
      const [users, total] = await this.userRepository
        .createQueryBuilder('user')
        .skip((page - 1) * size)
        .take(page * size)
        .getManyAndCount()

      return {
        data: users,
        total
      }
    } else {
      const users = await this.userRepository.find()

      return {
        data: users,
        total: users.length
      }
    }
  }

}