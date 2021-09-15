import User from '@users/entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import GoogleUser from '@users/entity/googleUser.entity';
import Product from './products/entity/product.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    ProductsModule,
    SeedModule,
    TypeOrmModule.forFeature([User, GoogleUser, Product]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
