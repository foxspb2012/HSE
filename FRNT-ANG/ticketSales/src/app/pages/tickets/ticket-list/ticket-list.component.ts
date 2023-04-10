import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITour } from '../../../models/tours';
import { Router } from '@angular/router';
import { BlocksStyleDirective } from '../../../directive/blocks-style.directive';
import { TicketService } from '../../../services/ticket/ticket.service';
import { TicketsStorageService } from '../../../services/tickets-storage/tickets-storage.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets: ITour[];
  nameTour: string;
  renderCompleted: boolean = false;

  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  constructor(private ticketService: TicketService,
              private ticketStorage: TicketsStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);
      });
  }

  ngAfterViewInit(): void {
  }

  search(evt: Event): void {
    const findNameTour: ITour | undefined = this.tickets.find((item: ITour): boolean => {
      return item.name === this.nameTour;
    })
    if (findNameTour) {
      this.goToTicketInfoPage(findNameTour);
    }
  }

  goToTicketInfoPage(item: ITour): void {
    this.router.navigate([`/tickets/ticket/${item.id}`]);

    /**
     * for queryParamMap - если использовать этот метод, то надо
     * в tickets-routing.module.ts заменить path: 'ticket/:id, на  path: ticket
     * this.router.navigate([`/tickets/ticker`], {queryParams:{id: item.id}})
     */
  }

  directiveRenderComplete(evt: boolean): void {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #e9edee');

    this.blockDirective.initStyle(0);
    this.renderCompleted = true;
  }
}
