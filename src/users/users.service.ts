import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChangePasswordDto from '@dto/userChangePassword.dto';
import GoogleUser from './entity/googleUser.entity';
import CreateUserDto from '@users/dto/user.dto';
import UserLogin from '@dto/userLogin.dto';
import User from './entity/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as config from 'config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MUser, UserDocument } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(GoogleUser)
    private googleRepository: Repository<GoogleUser>,
    @InjectModel(MUser.name)
    private userModel: Model<UserDocument>,
  ) {}

  createHash(login: string) {
    const signature = {
      user: login,
      iat: Math.floor(Date.now() / 1000) - 30,
    };
    const older_token = jwt.sign(signature, config.get('jwt.secret'));
    return older_token;
  }

  async getRoles(user_name: string) {
    // Postgress
    // const user = await this.usersRepository.findOne({
    //   where: { user_name: user_name },
    // });

    const user = await this.userModel.findOne({ user_name });

    return user.roles;
  }

  async googleLogin(req) {
    const { user } = req;
    if (!user) {
      return 'No user from google';
    }

    // Postgress
    // const isExist = await this.googleRepository.findOne({
    //   where: { googleId: user.id },
    // });

    const isExist = await this.userModel.findOne({
      googleId: user.id,
    });

    if (!isExist) {
      // Postgress
      // const data = {
      //   name: `${user.firstName} ${user.lastName}`,
      //   googleId: user.id,
      // };

      const data = {
        username: `${user.firstName} ${user.lastName}`,
        first_name: user.firstName,
        last_name: user.lastName,
        googleId: user.id,
      };

      // Postgress
      // const newUser = await this.googleRepository.create(data);
      // await this.googleRepository.save(newUser);

      const newUser = new this.userModel(data);
      await newUser.save();

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
    // Postgress
    // const user = await this.usersRepository.findOne({
    //   where: { user_name: user_name },
    // });

    const user = await this.userModel.findOne({ user_name });

    if (user) return user;
    throw new HttpException(
      'User with this user_name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async registration(@Body() data: CreateUserDto) {
    const { username } = data;
    // Postgress
    // const user = await this.usersRepository.findOne({
    //   where: { user_name: user_name },
    // });

    const user = await this.userModel.findOne({ username });

    if (!user) {
      // Postgress
      // const newUser = await this.usersRepository.create(data);
      // await this.usersRepository.save(newUser);
      const newUser = new this.userModel(data);
      return newUser.save();
    } else {
      throw new HttpException('User already exists', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(@Body() data: UserLogin) {
    const { user_name, password } = data;
    // Postgress
    // const user = await this.usersRepository.findOne({
    //   where: { user_name: user_name, password: password },
    // });

    const user = await this.userModel.findOne({ user_name, password });

    if (user) return { token: this.createHash(user_name), data: user };
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async changePassword(data: ChangePasswordDto, id: number) {
    const { newPassword, oldPassword } = data;
    try {
      // Postgress
      // const user = await this.usersRepository.findOne({
      //   where: { id: id },
      // });

      const user = await this.userModel.findOne({ _id: id });

      const hash = await bcrypt.compare(oldPassword, user.password);

      if (hash) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Postgress
        // await this.usersRepository.update(id, { password: hashedPassword });

        const updatedPost = await this.userModel.findOneAndUpdate(
          { _id: id },
          { $set: { password: hashedPassword } },
        );
        updatedPost.password = undefined;

        // Postgress
        // const updatedPost = await this.usersRepository.findOne({
        //   where: { id: id },
        // });
        if (updatedPost) return updatedPost;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException('Wrong data', HttpStatus.NOT_FOUND);
    }
  }
}
