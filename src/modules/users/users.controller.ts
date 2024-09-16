import { Controller, Get, Patch, Put, Param, Query, Body, Logger } from '@nestjs/common'
import { User } from '../../entity/User';
import { PaginationResponse } from '../../helpers/pagination-response';
import { FindUsersParamsDto } from './dtos/find-users-params.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param() params): Promise<User> {
    return this.usersService.findUserById(params.id)
  } 

  @Get() 
  async findUsers(@Query() params?: FindUsersParamsDto): Promise<PaginationResponse<User>> {
    return this.usersService.findUsers(params)
  }

  @Put(':id')
  async updateUser(@Param() userId: { id: string }, @Body() data: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userId.id, data)
  }

  @Patch(':id')
  async patchUser(@Param('id') userId: string, @Body() dto: PatchUserDto): Promise<User> {
    return this.usersService.patchUser(userId, dto)
  }

}