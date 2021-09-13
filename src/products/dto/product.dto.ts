import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the Product.',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The quantity of the Product.',
  })
  @IsNotEmpty()
  quantity: number;
}
