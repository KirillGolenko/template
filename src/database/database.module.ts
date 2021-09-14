import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.get('database.mongodb.uri'), {
      useFindAndModify: false,
    }),
    TypeOrmModule.forRoot({
      ...config.get('database.postgresql'),
    }),
  ],
})
export class DatabaseModule {}
