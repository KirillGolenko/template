import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import Product from 'src/products/entity/product.entity';
import { ProductsService } from './products.service';
import { RolesGuard } from '@guard/roles.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { MProduct, MProductSchema } from './model/product.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MongooseModule.forFeature([
      { name: MProduct.name, schema: MProductSchema },
    ]),
  ],
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
