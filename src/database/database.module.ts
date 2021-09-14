import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@users/entity/user.entity';
import Product from 'src/products/entity/product.entity';
import GoogleUser from '@users/entity/googleUser.entity';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.get('database.type'),
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.db'),
      entities: [User, GoogleUser, Product],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
