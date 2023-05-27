import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../schemas/users';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {name: UserModel.name, schema: UserSchema}
  ])],
  providers: [UsersRepository],
  exports: [UsersRepository]
})
export class UsersModule {
}
