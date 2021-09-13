import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export default class ChangePasswordDto {
  @ApiProperty({
    description: 'New password',
  })
  @IsNotEmpty()
  @Length(5, 20)
  password: string;
}
