import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as faker from 'faker';
import { MUser, UserDocument } from '@users/model/user.model';
import { MProduct, ProductDocument } from '@products/model/product.model';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(MUser.name)
    private userModel: Model<UserDocument>,
    @InjectModel(MProduct.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async seed(): Promise<any> {
    try {
      // await this.userModel.collection.drop();
      // await this.productModel.collection.drop();

      const users = await this.userModel.find();
      const product = await this.productModel.find();

      if (users.length !== 0 || product.length !== 0) {
        return;
      }

      const timeSeriesUser = [];
      const timeSeriesProduct = [];

      for (let i = 0; i < 50; i++) {
        const first_name = faker.name.firstName();
        const last_name = faker.name.lastName();
        const username = `${first_name} ${last_name}`;
        const password = await bcrypt.hash('restart987', 10);

        const productName = faker.commerce.productName();
        const quantity = Math.floor(Math.random() * 1000);

        timeSeriesUser.push({
          username,
          first_name,
          last_name,
          password,
        });

        timeSeriesProduct.push({
          name: productName,
          quantity,
        });
      }

      await this.userModel.insertMany(timeSeriesUser);
      await this.productModel.insertMany(timeSeriesProduct);

      return this.logger.log('Seeding successfully');
    } catch (err) {
      this.logger.error(err);
    }
  }

  onModuleInit() {
    this.seed();
  }
}
