import { IsNotEmpty, Length } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export default class CreateUserDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @Length(5, 20)
  password: string;

  @IsNotEmpty()
  roles: Role.User | Role.Admin;
}
