import { IsEmail, IsNumber, IsString } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class CreateUserDto {

  @IsString()
  public login: string;

  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID},
  )
  public email: string;

  @IsString()
  public psw: string;

  @IsNumber()
  public cardNumber: string;
}
