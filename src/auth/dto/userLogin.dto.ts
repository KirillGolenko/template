import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class UserLogin {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'admin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'test159159',
  })
  @IsNotEmpty()
  password: string;
}
