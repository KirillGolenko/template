import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
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
    description: 'The roles of the user.',
  })
  @Column({ default: Role.User })
  roles: Role.User | Role.Admin;

  @ApiProperty({
    description: 'The googleId of the user.',
  })
  @Column({ default: 0 })
  googleId: number;

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
