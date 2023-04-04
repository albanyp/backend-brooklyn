import { Injectable, Query, Logger, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entity/user'
import { FindUsersParamsDto } from './dtos/find-users-params.dto'
import { PAGE_SIZE } from '../../constants'
import { UpdateUserDto } from './dtos/update-user.dto'
import { PaginationResponse } from '../../helpers/pagination-response'
import { PatchUserDto } from './dtos/patch-user.dto'
import { validateEntityKeys } from '../../helpers/patch-utils'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id })
    return user
  }

  async findUsers(@Query() params?: FindUsersParamsDto): Promise<PaginationResponse<User>> {
    // const page = params && params.pageNumber ? params.pageNumber : 1
    const page = params?.pageNumber || null
    const size = params?.pageSize || PAGE_SIZE

    if (page) {
      const queryBuilder = await this.userRepository
        .createQueryBuilder('user')
        .skip((page - 1) * size)
        .take(page * size)

      if (params.firstName) {
        queryBuilder.where('user.firstName ilike :firstName', { firstName: `%${params.firstName}%` })
      }

      if (params.lastName) {
        queryBuilder.andWhere('user.lastName ilike :lastName', { lastName: `%${params.lastName}%` })
      }

      if (params.email) {
        queryBuilder.andWhere('user.email ilike :email', { email: `%${params.email}%` })
      }

      if (params.nickname) {
        queryBuilder.andWhere('user.nickname ilike :nickname', { nickname: `%${params.nickname}%` })
      }

      const [users, total] = await queryBuilder.getManyAndCount()

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

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id)
    const newUser = user

    if (user) {
      const newUserData = Object.keys(data)

      newUserData.forEach(item => {
        if (data[item] !== user[item]) {
          newUser[item] = data[item]
        }
      })

      this.userRepository.save(newUser)
      return newUser
    }
  }

  async patchUser(id: string, dto: PatchUserDto): Promise<User> {
    const validKeys = ['firstName', 'lastName', 'email', 'birthdate', 'nickname', 'logoUrl']
    validateEntityKeys(validKeys, dto)

    const userToPatch = await this.findUserById(id)

    if (userToPatch && userToPatch[dto.key] !== dto.value) {
      this.userRepository.update(id, {
        [dto.key]: dto.value
      })
      
      return {
        ...userToPatch,
        [dto.key]: dto.value
      }
    }
  }

}