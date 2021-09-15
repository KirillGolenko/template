import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MUser, MUserSchema } from '@users/model/user.model';
import { MProduct, MProductSchema } from 'src/products/model/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MUser.name, schema: MUserSchema },
      { name: MProduct.name, schema: MProductSchema },
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
