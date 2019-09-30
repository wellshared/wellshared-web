import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { VerSalasComponent } from './components/pages/ver-salas/ver-salas.component';
import { AlquilaTuSalaComponent } from './components/pages/alquila-tu-sala/alquila-tu-sala.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { CookiesComponent } from './components/pages/cookies/cookies.component';
import { PoliticaPrivacidadComponent } from './components/pages/politica-privacidad/politica-privacidad.component';
import { SalasDetailComponent } from './components/pages/salas-detail/salas-detail.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'salas', component: VerSalasComponent },
    { path: 'salas/:id', component: SalasDetailComponent },
    { path: 'alquila', component: AlquilaTuSalaComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'privacidad', component: PoliticaPrivacidadComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(routes, {useHash: true});
