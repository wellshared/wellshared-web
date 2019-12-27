import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from './services/HTTPListener.interceptor';
import { UserService } from './services/user.service';
import { BsLocaleService, defineLocale, esLocale } from 'ngx-bootstrap';
import { Meta, Title } from '@angular/platform-browser';
import { CanonicalService } from './services/canonical.service';
import { Constants } from './utils/constants';
defineLocale('es', esLocale);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  HTTPActivity: boolean;
  paymentProcess: boolean;
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
    this.httpStatus.getPaymentProcess().subscribe((status: boolean) => this.paymentProcess = status);
    this.titleService.setTitle(this.title);
    this.meta.addTags([
      // tslint:disable-next-line:max-line-length
      { name: 'keywords', content: 'reserva, reservar, alquila, alquiler, salas, espacios, fisioterapia, fisioterapeuta, barcelona, bcn, fisios, salas bcn, alquiler fisio bcn' },
      { name: 'robots', content: 'index, salas, contacto, alquila, faq, cookies, privacidad' },
      { name: 'author', content: 'Gerard Ortega' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-11-13', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);
    this.canonicalService.setCanonicalURL();
    this.loadStripe();
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-custom-form-script')) {
      const s = window.document.createElement('script');
      s.id = 'stripe-custom-form-script';
      s.type = 'text/javascript';
      s.src = 'https://js.stripe.com/v2/';
      s.onload = () => {
        // tslint:disable-next-line:no-string-literal
        window['Stripe'].setPublishableKey('pk_test_RJs6LNejtYLOKeJFhBEJckhc00RNu6006x');
      };
      window.document.body.appendChild(s);
    }
  }

  accept() {
    this.acceptCookies = true;
    sessionStorage.setItem('cooktmps', new Date().getUTCDay().toString());
  }
}
