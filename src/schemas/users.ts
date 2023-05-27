import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '@ticketsales/shared-types';


export type UserDocument = HydratedDocument<UserModel>

@Schema({
  collection: 'users',
})

export class UserModel implements IUser {
  @Prop({
    required: true,
  })
  public login: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public cardNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
