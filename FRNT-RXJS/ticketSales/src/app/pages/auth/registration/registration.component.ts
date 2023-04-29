import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from '../../../models/users';
import { AuthService } from '../../../services/auth/auth.service';
import { ConfigService } from '../../../services/config/config.service';

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
              private authService: AuthService) {
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

    if (!this.authService.isUserExists(userObj.login.toLowerCase())) {
      this.authService.setUser(userObj, saveToStorage);
      this.messageService.add({severity: 'success', summary: 'registered successfully'});
    } else {
      this.messageService.add({severity: 'warn', summary: 'user already registered'});
    }
  }
}
