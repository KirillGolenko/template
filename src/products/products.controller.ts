import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/product.dto';
import { ProductsService } from './products.service';
import Product from 'src/products/entity/product.entity';
import JwtAuthenticationGuard from '@guard/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  findProduct(@Param('id') id: number): Promise<{ data: Product }> {
    return this.productService.findProduct(id);
  }

  @Post('/create')
  @UseGuards(JwtAuthenticationGuard)
  registration(@Body() body: CreateProductDto): Promise<{ data: Product[] }> {
    return this.productService.createProduct(body);
  }

  @Put('/:id/edit')
  editProduct(@Body() body: Product, @Param('id') id: number) {
    return this.productService.editProduct(body, id);
  }
}
