import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableExampleService } from '../../services/testing/testing.service';
import { Subject, takeUntil } from 'rxjs';
import { SettingService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit, OnDestroy {
  private subjectForUnsubscribe = new Subject();
  darkTheme: boolean;

  constructor(private testing: ObservableExampleService,
              private settingService: SettingService) {
  }

  ngOnInit(): void {

    // settingsData observable
    this.settingService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data);
    });

    // settings data subject
    this.settingService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data from subject', data);
      });
  }

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  enableSettings(evt: Event): void {
    const darkTheme: boolean = this.darkTheme;

    if (darkTheme) {
      console.log("darkTheme");
    }
  }
}


