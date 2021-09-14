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
import JwtAuthenticationGuard from '@guard/jwtAuthentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  findProduct(@Param('id') id: number): Promise<{ data: Product }> {
    return this.productService.findProduct(id);
  }

  @Post('/create')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard)
  registration(@Body() body: CreateProductDto): Promise<{ data: Product[] }> {
    return this.productService.createProduct(body);
  }

  @Put('/:id/edit')
  editProduct(@Body() body: Product, @Param('id') id: number) {
    return this.productService.editProduct(body, id);
  }
}
