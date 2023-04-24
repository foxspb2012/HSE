import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private myBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('some data of Behavior subject');
  private mySubject: Subject<string> = new Subject<string>();
  private myObservable: Observable<string> = new Observable<string>((subscriber: Subscriber<string>): void => {
    setTimeout((): void => {
      subscriber.next('someValue');
    }, 3000);
  });

  constructor() {
  }

  initObservable(): void {

    const observable = new Observable((subscriber): void => {
      subscriber.next();
      subscriber.next();
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('err');
      })
    });

    const sub = observable.subscribe(
      (data) => {
        console.log('observable data', data);
      },
      (error) => {
        console.log('error', error);
      });

    sub.unsubscribe();
  }

  getObservable(): Observable<string> {
    return this.myObservable;
  }

  getSubject(): Subject<string> {
    return this.mySubject;
  }

  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviorSubject;
  }
}
