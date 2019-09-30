import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { appRouting } from './app.routes';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { CookiesComponent } from './components/pages/cookies/cookies.component';
import { PrivacityComponent } from './components/pages/privacity/privacity.component';
import { RoomsDetailComponent } from './components/pages/rooms-detail/rooms-detail.component';
import { AgmCoreModule } from '@agm/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTPStatus, HTTPListener } from './services/HTTPListener.interceptor';
import { LoaderComponent } from './components/shared/loader/loader.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/pages/login/login.component';
import { BookComponent } from './components/pages/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RoomsComponent,
    ContactComponent,
    BookComponent,
    FaqComponent,
    CookiesComponent,
    PrivacityComponent,
    RoomsDetailComponent,
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
