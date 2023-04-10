import {Injectable} from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;

  constructor() {
  }

  getSessionUser(): string{
    return window.sessionStorage.getItem(`userSession:`) || "" ;
  };

  setSessionUser(user: IUser): void {
    window.sessionStorage.setItem(`userSession:`, user.login);
  };
}
