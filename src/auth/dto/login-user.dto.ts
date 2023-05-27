import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public login: string;

  @IsString()
  public psw: string;
}
