import { Injectable } from '@angular/core';
import { IUser } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() {
  }

  checkUser(user: IUser): boolean {
    const login = user.login.toLowerCase();
    const inLocalStorage = window.localStorage.getItem(`userLogin: ${login}`);
    const inUsersStorage = this.usersStorage.find((el) => el.login.toLowerCase() === login);

    let userInStore: IUser = <IUser>{};

    if (inLocalStorage) {
      userInStore = JSON.parse(inLocalStorage);
      return userInStore.psw === user.psw;
    } else if (inUsersStorage) {
      return inUsersStorage.psw === user.psw;
    } else {
      return false;
    }
  }

  setUser(user: IUser, saveToStorage: boolean): void {
    if (saveToStorage) {
      window.localStorage.setItem(`userLogin: ${user.login.toLowerCase()}`, JSON.stringify(user));
    } else {
      this.usersStorage.push(user);
    }
  }

  isUserExists(login: string): boolean {
    const inLocalStorage = Boolean(window.localStorage.getItem(`userLogin: ${login}`));
    const inUsersStorage = Boolean(this.usersStorage.find((el) => el.login === login));

    return inLocalStorage || inUsersStorage;
  }
}
