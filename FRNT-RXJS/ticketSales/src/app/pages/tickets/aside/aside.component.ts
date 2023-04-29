import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMenuType } from '../../../models/menuType';
import { ITourTypeSelect } from '../../../models/tours';
import { TicketService } from '../../../services/ticket/ticket.service';
import { MessageService } from "primeng/api";
import { SettingService } from '../../../services/settings/settings.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;

  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();

  constructor(private ticketService: TicketService, private messageService: MessageService,
              private settingService: SettingService) {
  }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  changeType(evt: { evt: Event, value: IMenuType }): void {
    this.updateMenuType.emit(evt.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(evt: string) {
    console.log('evt', evt)
    this.ticketService.updateTour({date: evt})
  }

  //обработка ошибок
  initRestError(): void {
    this.ticketService.getError().subscribe((data) => {

    }, (err) => {
      this.messageService.add({severity: 'error', summary: 'Ошибка', detail: 'Ошибка сервера'})
    });
  }

// при каждом клике рассылка происходит
  initSettingsData(): void {
    this.settingService.loadUserSettingsSubject({
      saveToken: false,
    })
  }
}
