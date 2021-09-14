import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = MUser & Document;

@Schema()
export class MUser {
  @Prop()
  username: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({
    default: Role.User,
  })
  roles: Role;

  @Prop()
  googleId: number;

  @Prop()
  password: string;
}

export const MUserSchema = SchemaFactory.createForClass(MUser);
