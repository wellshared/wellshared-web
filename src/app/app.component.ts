import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from './services/HTTPListener.interceptor';
import { UserService } from './services/user.service';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  HTTPActivity: boolean;
  title = 'app';
  acceptCookies = false;
  constructor(private httpStatus: HTTPStatus, private userService: UserService, private localeService: BsLocaleService) {}
  ngOnInit(): void {
    this.localeService.use('es');
    this.userService.getConnectedUser().subscribe();
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => this.HTTPActivity = status);
  }
}
