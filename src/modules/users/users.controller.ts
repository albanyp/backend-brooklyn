import { Controller, Get, Param, Logger, Query } from '@nestjs/common'
import { FindUsersDto } from './find-users.dto';
import { UsersService } from './users.service';

Param

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findUser(@Param() params) {
    Logger.log(params.id)
    return this.usersService.getUser(params.id)
  } 

  @Get() 
  async findUsers(@Query() params?: FindUsersDto) {
    return this.usersService.getUsers(params)
  }

}