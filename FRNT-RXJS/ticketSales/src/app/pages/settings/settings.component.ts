import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ObservableExampleService } from '../../services/testing/testing.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {
  private subjectScope: Subject<string>;
  private subjectUnsubscribe: Subscription;
  darkTheme: boolean;

  constructor(
    @Inject(ObservableExampleService) private testing: ObservableExampleService) {
  }

  ngOnInit(): void {
    this.subjectScope = this.testing.getSubject();

    // subscribe
    this.subjectScope.subscribe((data) => {
      console.log('subscribe data', data);
    });

    // send subject data
    this.subjectScope.next('subject value');

    // unsubscribe
    this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
      console.log('unsubscribe', data);
    });
  }

  ngOnDestroy(): void {
    this.subjectUnsubscribe.unsubscribe();
  }

  enableSettings(evt: Event): void {
    const darkTheme: boolean = this.darkTheme;

    if (darkTheme) {
      console.log("darkTheme");
    }
  }
}


