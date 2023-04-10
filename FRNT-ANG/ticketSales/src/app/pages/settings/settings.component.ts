import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  darkTheme: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  enableSettings(evt: Event): void   {
    const darkTheme: boolean = this.darkTheme;

    if (darkTheme) {
    console.log("darkTheme");
    }
  }
}


