import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GoogleUser')
export default class GoogleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The user_name of the user.',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    description: 'The first_name of the user.',
  })
  @Column()
  googleId: string;
}
