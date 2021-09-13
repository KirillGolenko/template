import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The user_name of the user.',
  })
  @Column({ unique: true })
  user_name: string;

  @ApiProperty({
    description: 'The first_name of the user.',
  })
  @Column()
  first_name: string;

  @ApiProperty({
    description: 'The last_name of the user.',
  })
  @Column()
  last_name: string;

  @ApiProperty({
    description: 'The password of the user.',
  })
  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
