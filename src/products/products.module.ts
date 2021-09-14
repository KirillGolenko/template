import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/products/entity/product.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@guard/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
