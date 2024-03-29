import { Component, OnInit } from '@angular/core';
import { IMenuType } from '../../models/menuType';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;

  constructor() {
  }

  ngOnInit(): void {
  }

  updateSelectedType(evt: IMenuType): void {
    this.selectedType = evt;
  }
}
