import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class LoginPayload {
  @ApiProperty({
    description: 'The useuser_name of the user.',
    example: 'admin',
  })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'test159159',
  })
  @IsNotEmpty()
  password: string;
}
