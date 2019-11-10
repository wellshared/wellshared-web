import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from './services/HTTPListener.interceptor';
import { UserService } from './services/user.service';
import { BsLocaleService, defineLocale, esLocale } from 'ngx-bootstrap';
defineLocale('es', esLocale);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  HTTPActivity: boolean;
  title = 'app';
  acceptCookies = false;
  constructor(private httpStatus: HTTPStatus, private userService: UserService, private localeService: BsLocaleService) {
    this.userService.getConnectedUser().subscribe();
  }
  ngOnInit(): void {
    this.localeService.use('es');
    const cookTmp = sessionStorage.getItem('cooktmps');
    if (cookTmp && cookTmp === new Date().getUTCDay().toString()) {
      this.acceptCookies = true;
    }
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => this.HTTPActivity = status);
  }

  accept() {
    this.acceptCookies = true;
    sessionStorage.setItem('cooktmps', new Date().getUTCDay().toString());
  }
}
