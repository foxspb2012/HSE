import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';
import { Observable, Subject } from 'rxjs';
import { ITour, ITourTypeSelect } from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  // 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  // // 2 вариант доступа к Observable
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  constructor(private ticketServiceRest: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }
}
