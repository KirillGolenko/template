import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/products/entity/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { MProduct, ProductDocument } from './model/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectModel(MProduct.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findProduct(id): Promise<{ data: MProduct }> {
    // Postgress
    // const product = await this.productRepository.findOne({
    //   where: { id: id },
    // });
    const product = await this.productModel.findOne({ _id: id });
    if (product) return { data: product };
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async createProduct(data: CreateProductDto): Promise<{ data: MProduct }> {
    // Postgress
    // const newProduct = this.productRepository.create(data);
    // await this.productRepository.save(newProduct);

    const newProduct = new this.productModel(data);
    await newProduct.save();
    return { data: newProduct };
  }

  async editProduct(data: CreateProductDto, id: number) {
    try {
      const { name, quantity } = data;
      // Postgress
      // await this.productRepository.update(id, data);

      const editProduct = await this.productModel.findByIdAndUpdate(
        { _id: id },
        { $set: { name, quantity } },
      );
      if (editProduct) return editProduct;
    } catch (error) {
      throw new HttpException('Wrong data', HttpStatus.NOT_FOUND);
    }
    // Postgress
    // const updatedPost = await this.productRepository.findOne({
    //   where: { id: id },
    // });
    // if (updatedPost) return updatedPost;
    // throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
