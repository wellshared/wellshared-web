import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { CookiesComponent } from './components/pages/cookies/cookies.component';
import { PrivacityComponent } from './components/pages/privacity/privacity.component';
import { RoomsDetailComponent } from './components/pages/rooms-detail/rooms-detail.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RentComponent } from './components/pages/rent/rent.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'salas', component: RoomsComponent },
    { path: 'salas/:id', component: RoomsDetailComponent },
    { path: 'alquila', component: RentComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'privacidad', component: PrivacityComponent },
    { path: 'centers', component: PrivacityComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(routes, {useHash: true});
