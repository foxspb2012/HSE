import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from '@ticketsales/shared-types';

export type OrderDocument = HydratedDocument<IOrder>;

@Schema({
  collection: 'tours',
})
export class OrderModel implements IOrder {
  @Prop() age: string;

  @Prop() birthDay: string;

  @Prop() cardNumber: string

  @Prop() tourId: string

  @Prop() userId: string;

  @Prop() _id: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
