import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersEntity } from '../users/users.entity';
import { IUser } from '@ticketsales/shared-types';
import { UsersRepository } from '../users/users.repository';
import {
  AUTH_USER_BY_ID,
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from './auth.constant';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UsersRepository,
              private readonly jwtService: JwtService) {
  }

  async register(dto: CreateUserDto) {
    console.log(dto);
    const {login, email, psw, cardNumber} = dto;
    const user: IUser = {
      login,
      email,
      passwordHash: '',
      cardNumber,
    };

    const existUser = await this.userRepository
      .findByLogin(login);

    if (existUser) {
      throw new Error(AUTH_USER_EXISTS);
    }

    const userEntity = await new UsersEntity(user).setPassword(psw);


    const createdUser = await this.userRepository
      .create(userEntity);

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {login, psw} = dto;
    const existUser = await this.userRepository.findByLogin(login);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND);
    }

    const siteUserEntity = new UsersEntity(existUser);
    if (!await siteUserEntity.comparePassword(psw)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return siteUserEntity.toObject();
  }

  async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(AUTH_USER_BY_ID);
    }

    return user;
  }

  async loginUser(user: IUser) {
    const payload = {
      sub: user._id,
      login: user.login,
    };

    return {
      id: user._id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
