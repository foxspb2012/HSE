import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../models/users';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  currentPsw: string;
  newPsw: string;
  newPswRepeat: string

  constructor(private messageService: MessageService,
              private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  changePsw(): void | boolean {
    const userPsw = this.userService.getUser()?.psw;
    if (userPsw !== this.currentPsw) {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Введен неверный текущий пароль'});
      return false;
    }
    if (this.newPsw !== this.newPswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Пароли не совпадают'});
      return false;
    } else {
      this.messageService.add({severity: 'success', summary: 'Успешно!', detail: 'Пароль успешно изменен'});
      const user = this.userService.getUser();
      const newUser = <IUser>{...user};
      newUser.psw = this.newPsw;
      this.authService.setUser(newUser, true);
      this.router.navigate(['tickets/tickets-list']);
    }
  }
}
