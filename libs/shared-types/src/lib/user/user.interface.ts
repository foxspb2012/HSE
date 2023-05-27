export interface IUser {
  _id?: string;
  login: string,
  email?: string,
  passwordHash: string;
  cardNumber?: string
}
