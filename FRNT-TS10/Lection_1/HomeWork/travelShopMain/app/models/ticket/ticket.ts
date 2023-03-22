import {IUser} from '../user/user';

export interface ITicket {
  id?: string,
  description: string,
  name: string,
  price: string,
  tourOperator: string,
  location: {
    x: '30.4044',
    y: '70.45'
  },
  hotel: string
}

export interface IVipTicket extends ITicket {
  vipNumber: number,
  vipStatus: string
}

export type TicketType = ITicket | IVipTicket;

export interface IPostTicketData {
  ticket: TicketType,
  user: IUser,
}
