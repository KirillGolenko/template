import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.get('database.postgresql'),
    }),
  ],
})
export class DatabaseModule {}
