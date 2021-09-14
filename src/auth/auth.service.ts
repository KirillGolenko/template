import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import User from '@users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as config from 'config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(registrationData: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser: User = await this.usersService.registration({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'User with that user name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(
    user_name: string,
    plainTextPassword: string,
  ) {
    try {
      const user = await this.usersService.getByUserName(user_name);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getCookieWithJwtToken(user_name: string) {
    const roles = await this.usersService.getRoles(user_name);
    const payload = { user_name, roles };

    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${config.get(
      'jwt.expirationTime',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
