import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  constructor() {
  }

  getUser(): string{
    return window.sessionStorage.getItem(`userSession:`) || "" ;
  };

  setUser(user: IUser): void {
    window.sessionStorage.setItem(`userSession:`, user.login);
  };
}
