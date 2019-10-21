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
import { LoginComponent } from './components/pages/login/login.component';
import { RentComponent } from './components/pages/rent/rent.component';
import { PrivateModule } from './private/private.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginGuard } from './login.guard';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RoomsComponent,
    ContactComponent,
    RentComponent,
    FaqComponent,
    CookiesComponent,
    PrivacityComponent,
    RoomsDetailComponent,
    LoaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    appRouting,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    PrivateModule,
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgygXyg6jch1M0qaBmilfsO0Sb1LPP6tQ'
    })
  ],
  providers: [
    DatePipe,
    BsModalRef,
    HTTPStatus,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
