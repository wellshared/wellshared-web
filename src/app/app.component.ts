import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from './services/HTTPListener.interceptor';
import { UserService } from './services/user.service';
import { BsLocaleService, defineLocale, esLocale } from 'ngx-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from './services/canonical.service';
defineLocale('es', esLocale);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  HTTPActivity: boolean;
  title = 'Wellshared - Salas de fisioterapia en Barcelona';
  acceptCookies = false;
  constructor(private httpStatus: HTTPStatus, private userService: UserService, private localeService: BsLocaleService, 
    private meta: Meta, private titleService: Title, private canonicalService: CanonicalService) {
    this.userService.getConnectedUser().subscribe();
  }
  ngOnInit(): void {
    this.localeService.use('es');
    const cookTmp = sessionStorage.getItem('cooktmps');
    if (cookTmp && cookTmp === new Date().getUTCDay().toString()) {
      this.acceptCookies = true;
    }
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => this.HTTPActivity = status);
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      { name: 'keywords', content: 'reserva, reservar, alquila, alquiler, salas, espacios, fisioterapia, fisioterapeuta, barcelona, bcn, fisios, salas bcn, alquiler fisio bcn' },
      { name: 'robots', content: 'index, salas, contacto, alquila, faq, cookies, privacidad' },
      { name: 'author', content: 'Gerard Ortega' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-11-13', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.canonicalService.setCanonicalURL();
  }

  accept() {
    this.acceptCookies = true;
    sessionStorage.setItem('cooktmps', new Date().getUTCDay().toString());
  }
}
