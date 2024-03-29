import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() {
  }

  isTabCaching: boolean = false;

  ngOnInit(): void {
    window.sessionStorage.removeItem('userSession:');
  }
}
