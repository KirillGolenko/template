import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import GoogleUser from './entity/googleUser.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MUser, MUserSchema } from './model/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, GoogleUser]),
    MongooseModule.forFeature([{ name: MUser.name, schema: MUserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
