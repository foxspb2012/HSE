import { CRUDRepository } from '@ticketsales/core';
import { UsersEntity } from './users.entity';
import { IUser } from '@ticketsales/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../schemas/users';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements CRUDRepository<UsersEntity, string, IUser> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UsersEntity>) {
  }

  public async create(item: UsersEntity): Promise<IUser> {
    console.log('create user');
    const newSiteUser = new this.userModel(item);
    return newSiteUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel
      .deleteOne({id});
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.userModel
      .findById(id)
      .exec();
  }

  public async findByLogin(login: string): Promise<IUser | null> {
    return this.userModel
      .findOne({login})
      .exec();
  }

  public async update(id: string, item: UsersEntity): Promise<IUser> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
