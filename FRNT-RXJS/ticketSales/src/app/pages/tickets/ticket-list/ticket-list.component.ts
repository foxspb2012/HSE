import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITour, ITourTypeSelect } from '../../../models/tours';
import { Router } from '@angular/router';
import { BlocksStyleDirective } from '../../../directive/blocks-style.directive';
import { TicketService } from '../../../services/ticket/ticket.service';
import { TicketsStorageService } from '../../../services/tickets-storage/tickets-storage.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  tickets: ITour[];
  nameTour: string;
  renderCompleted: boolean = false;
  tourUnsubscriber: Subscription;
  ticketsCopy: ITour[];

  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketService,
              private ticketStorage: TicketsStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      });

    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect): void => {
      console.log('data', data)

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      }

      if (data.date) {
        const dateWithoutTime: string[] = new Date(data.date).toISOString().split('T');
        const dateValue: string = dateWithoutTime[0];
        console.log('dateValue', dateValue);
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout((): void => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => {
            const nameToLower = typeof (el?.name) === "string" ? el.name.toLowerCase() : '';
            return nameToLower.includes(this.ticketSearchValue.toLowerCase());
          });
        } else {
          this.tickets = [...this.ticketsCopy]
        }
      }
    );
  }

  // search(evt: Event): void {
  //   const findNameTour: ITour | undefined = this.tickets.find((item: ITour): boolean => {
  //     return item.name === this.nameTour;
  //   })
  //   if (findNameTour) {
  //     this.goToTicketInfoPage(findNameTour);
  //   }
  // }

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

  ngOnDestroy(): void {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }
}
