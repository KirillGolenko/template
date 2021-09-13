import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @ApiProperty({
    description: 'The useuser_name of the user.',
  })
  @Column({ unique: true })
  public user_name: string;

  @ApiProperty({
    description: 'The first_name of the user.',
  })
  @Column()
  public first_name: string;

  @ApiProperty({
    description: 'The last_name of the user.',
  })
  @Column()
  public last_name: string;

  @ApiProperty({
    description: 'The password of the user.',
  })
  @Column()
  public password: string;
}

export default User;
