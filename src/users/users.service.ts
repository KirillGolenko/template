import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import UserLogin from '@dto/userLogin.dto';
import CreateUserDto from '@users/dto/user.dto';
import ChangePasswordDto from '@dto/UserChangePassword.dto';
import User from './entity/user.entity';
import GoogleUser from './entity/googleUser.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(GoogleUser)
    private googleRepository: Repository<GoogleUser>,
  ) {}

  createHash(login: string) {
    const signature = {
      user: login,
      iat: Math.floor(Date.now() / 1000) - 30,
    };
    const older_token = jwt.sign(signature, process.env.JWT_SECRET);
    return older_token;
  }

  async googleLogin(req) {
    const { user } = req;
    if (!user) {
      return 'No user from google';
    }

    const isExist = await this.googleRepository.findOne({
      where: { googleId: user.id },
    });

    if (!isExist) {
      const data = {
        name: `${user.firstName} ${user.lastName}`,
        googleId: user.id,
      };
      const newUser = await this.googleRepository.create(data);
      await this.googleRepository.save(newUser);

      return {
        message: 'User information from google',
        user: newUser,
      };
    } else {
      return {
        message: 'User already exists',
      };
    }
  }

  async getByUserName(user_name: string) {
    const user = await this.usersRepository.findOne({
      where: { user_name: user_name },
    });
    if (user) return user;
    throw new HttpException(
      'User with this user_name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async registration(@Body() data: CreateUserDto) {
    const { user_name } = data;

    const user = await this.usersRepository.findOne({
      where: { user_name: user_name },
    });
    if (!user) {
      const newUser = await this.usersRepository.create(data);
      await this.usersRepository.save(newUser);
      return newUser;
    } else {
      throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(@Body() data: UserLogin) {
    const { user_name, password } = data;
    const user = await this.usersRepository.findOne({
      where: { user_name: user_name, password: password },
    });
    if (user) return { token: this.createHash(user_name), data: user };
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async changePassword(data: ChangePasswordDto, id: number) {
    const { newPassword, oldPassword } = data;
    try {
      const user = await this.usersRepository.findOne({
        where: { id: id },
      });
      const hash = await bcrypt.compare(oldPassword, user.password);

      if (hash) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(id, { password: hashedPassword });

        const updatedPost = await this.usersRepository.findOne({
          where: { id: id },
        });
        if (updatedPost) return updatedPost;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException('Wrong data', HttpStatus.NOT_FOUND);
    }
  }
}
