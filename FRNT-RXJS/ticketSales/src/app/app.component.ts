import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/testing/testing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title: string = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService) {

  }

  ngOnInit(): void {
    /** Observable **/
    const myObservable = this.testing.getObservable();
    // first subscriber
    myObservable.subscribe(() => {
      // console.log('first myObservable data');
    });

    // second subscriber
    myObservable.subscribe(() => {
      //  console.log('second myObservable data');
    });

    /** Subject **/
    const mySubject = this.testing.getSubject();

    // subscribe
    mySubject.subscribe((data) => {
      // console.log('first data subject', data);
    });

    mySubject.subscribe((data) => {
      // console.log('second data subject', data);
    });

    // send subject data
    mySubject.next('subject value');

    /** Behavior subject **/
    const myBehavior = this.testing.getBehaviorSubject();

    myBehavior.subscribe((data) => {
      // console.log('first data behaviorSubject', data);
    });

    myBehavior.next('new data1 from behaviorSubject');

    myBehavior.subscribe((data) => {
      // console.log('second subscriber data from behaviorSubject', data);
    });
  }
}
