import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICustomTicketData, ITour, ITourLocation } from "../../../models/tours";
import { ActivatedRoute } from "@angular/router";
import { TicketsStorageService } from '../../../services/tickets-storage/tickets-storage.service';
import { IUser } from '../../../models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { TicketService } from '../../../services/ticket/ticket.service';
import { forkJoin, fromEvent, Subscription } from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  nearestTours: ICustomTicketData[];
  tourLocation: ITourLocation[];
  ticketSearchValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;

  searchTypes = [1, 2, 3]

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) {
  }

  ngOnInit(): void {
    // first get userInfo
    this.user = this.userService.getUser();

    // init form group
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });

    // get nearest tours
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
      console.log('data', data);
      this.tourLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0], data[1]);
    });

    const routeIdParam = this.route.snapshot.paramMap.get('id');      // for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); // for queryParamMap

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
    }
  };

  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour();
    });
  }

  initSearchTour():void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.tourLocation)
    });
  }

  selectDate(e: Event): void {

  }

  onSubmit(): void {

  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTourData(postData).subscribe();
    console.log(postData);
  }
}
