import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from '@dto/product.dto';
import { ProductService } from './product.service';
import Product from '@model/product.entity';
import JwtAuthenticationGuard from '@guard/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

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
