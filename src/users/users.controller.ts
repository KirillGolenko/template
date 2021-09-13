import { Body, Controller, Put, Param } from '@nestjs/common';
import User from '@model/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Put('/:id/change')
  changePassword(@Body() body: User, @Param('id') id: number) {
    return this.usersService.changePassword(body, id);
  }
}
