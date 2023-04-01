import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../models/users';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService) {
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
      login: this.login.toLowerCase()
    }
    if (this.authService.checkUser(authUser)) {
      this.userService.setUser(authUser);
      this.router.navigate(['tickets/tickets-list'])
    } else {
      this.messageService.add({severity: 'error', summary: 'check the data'});
    }
  }
}
