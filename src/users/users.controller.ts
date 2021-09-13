import { Body, Controller, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import ChangePasswordDto from '@dto/changePassword.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('/changePassword')
  changePassword(@Body() body: ChangePasswordDto, @Query('id') id: number) {
    return this.usersService.changePassword(body, id);
  }
}
