import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { CenterComponent } from './components/center/center.component';

const routes: Routes = [
    {
        path: 'admin',
        component: PrivateComponent,
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
            }
        ]
}
];

export const privateRouting = RouterModule.forRoot(routes, {useHash: true});
