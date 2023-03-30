import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {IUser} from '../../../models/users';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {

  }

  vipStatusSelected(): void {
  }

  onAuth(evt: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    }
    if (this.authService.checkUser(authUser)) {

    } else {

    }
  }
}
