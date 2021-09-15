import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from '@guard/jwtAuthentication.guard';
import { CreateProductDto } from 'src/products/dto/product.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ProductsService } from './products.service';
import { Role } from 'src/auth/enums/role.enum';
import { MProduct } from './model/product.model';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/:id')
  findProduct(@Param('id') id): Promise<{ data: MProduct }> {
    return this.productService.findProduct(id);
  }

  @Post('/create')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard)
  registration(@Body() body: CreateProductDto): Promise<{ data: MProduct }> {
    return this.productService.createProduct(body);
  }

  @Put('/:id/edit')
  editProduct(@Body() body: CreateProductDto, @Param('id') id: number) {
    return this.productService.editProduct(body, id);
  }
}
