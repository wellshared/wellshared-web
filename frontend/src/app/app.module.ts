import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { appRouting } from './app.routes';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { VerSalasComponent } from './components/pages/ver-salas/ver-salas.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';
import { AlquilaTuSalaComponent } from './components/pages/alquila-tu-sala/alquila-tu-sala.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { CookiesComponent } from './components/pages/cookies/cookies.component';
import { PoliticaPrivacidadComponent } from './components/pages/politica-privacidad/politica-privacidad.component';
import { SalasDetailComponent } from './components/pages/salas-detail/salas-detail.component';
import { AgmCoreModule } from '@agm/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTPStatus, HTTPListener } from './services/HTTPListener.interceptor';
import { LoaderComponent } from './components/shared/loader/loader.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    VerSalasComponent,
    ContactoComponent,
    AlquilaTuSalaComponent,
    FaqComponent,
    CookiesComponent,
    PoliticaPrivacidadComponent,
    SalasDetailComponent,
    LoaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    appRouting,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgygXyg6jch1M0qaBmilfsO0Sb1LPP6tQ'
    })
  ],
  providers: [
    HTTPStatus,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
