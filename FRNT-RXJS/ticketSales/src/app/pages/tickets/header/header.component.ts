import { Component, OnDestroy, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';
import { IMenuType } from '../../../models/menuType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  items: MenuItem[];
  time: Date;
  private timeInterval: number;
  private settingsActive: boolean = false;
  user: string;

  @Input() menuType: IMenuType;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      }
    ];

    this.timeInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.user = this.userService.getSessionUser();
  }

  ngOnChanges(evt: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      window.clearInterval(this.timeInterval);
    }
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink: ['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      },
    ];
  }
}
