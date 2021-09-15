import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the Product.',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The quantity of the Product.',
  })
  @Column()
  quantity: number;
}

export default Product;
