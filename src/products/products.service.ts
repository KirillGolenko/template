import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findProduct(id: number): Promise<{ data: Product }> {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (product) return { data: product };
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async createProduct(data): Promise<{ data: Product[] }> {
    const newProduct = this.productRepository.create(data);
    await this.productRepository.save(newProduct);
    return { data: newProduct };
  }

  async editProduct(data: Product, id: number) {
    try {
      await this.productRepository.update(id, data);
    } catch (error) {
      throw new HttpException('Wrong data', HttpStatus.NOT_FOUND);
    }
    const updatedPost = await this.productRepository.findOne({
      where: { id: id },
    });
    if (updatedPost) return updatedPost;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
