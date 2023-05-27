import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from '../../../models/users';
import { AuthService } from '../../../services/auth/auth.service';
import { ConfigService } from '../../../services/config/config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveToStorage: boolean;
  showCardNumber: boolean;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  registration(evt: Event): void | boolean {
    const saveToStorage: boolean = this.saveToStorage;

    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'passwords don\'t match'});
      return false;
    }

    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }

    this.http.post('http://localhost:3000/auth/register/', userObj).subscribe(() => {
      if (saveToStorage) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});

    }, ()=> {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    });
  }
}
