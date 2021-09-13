import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    description: 'The name of the Product.',
  })
  @Column()
  public name: string;

  @ApiProperty({
    description: 'The quantity of the Product.',
  })
  @Column()
  public quantity: number;
}

export default Product;
