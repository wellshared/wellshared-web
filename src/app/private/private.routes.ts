import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { CenterComponent } from './components/center/center.component';
import { PrivateGuard } from './private.guard';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
    {
        path: 'admin',
        component: PrivateComponent,
        canActivate: [PrivateGuard],
        children: [
            {
                path: 'centers',
                component: CenterListComponent
            },
            {
                path: 'center',
                component: CenterComponent
            },
            {
                path: 'center/:id',
                component: CenterComponent
            },
            {
                path: 'books',
                component: BookListComponent
            },
            {
                path: 'book',
                component: BookComponent
            },
            {
                path: 'book/:id',
                component: BookComponent
            },
        ]
}
];

export const privateRouting = RouterModule.forRoot(routes, {useHash: true});
