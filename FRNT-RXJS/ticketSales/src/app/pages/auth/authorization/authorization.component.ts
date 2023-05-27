import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../models/users';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HttpClient } from '@angular/common/http';

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
  id: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {

  }

  vipStatusSelected(): void {
  }

  onAuth(evt: Event): void {
    const authUser: IUser ={
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
      id: this.id,
    }

    this.http.post<{access_token: string, id: string}>('http://localhost:3000/auth/login/', authUser).subscribe((data) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);
      this.userService.setToStore(token);

      this.router.navigate(['tickets/tickets-list']);

    }, ()=> {
      this.messageService.add({severity:'warn', summary: "Ошибка"});
    });
  }
}
