import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableExampleService } from '../../services/testing/testing.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { SettingService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subjectForUnsubscribe = new Subject()

  constructor(private testing: ObservableExampleService,
              private settingService: SettingService) {

  }

  ngOnInit(): void {
    this.settingService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    });
    this.settingService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data from subject', data);
      })
  }

  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }
}
