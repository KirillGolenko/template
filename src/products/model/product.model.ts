import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = MProduct & Document;

@Schema()
export class MProduct {
  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const MProductSchema = SchemaFactory.createForClass(MProduct);
