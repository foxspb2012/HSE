import { IUser } from '@ticketsales/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from '../auth/auth.constant';

export class UsersEntity implements IUser {
  public _id: string;
  public login: string;
  public email: string;
  public cardNumber: string
  public passwordHash: string;

  public async setPassword(password: string): Promise<UsersEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  constructor(siteUser: IUser) {
    this.fillEntity(siteUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: IUser) {
    this._id = user._id;
    this.login = user.login;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.cardNumber = user.cardNumber;
  }
}
