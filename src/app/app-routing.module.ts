import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './modules/init/pages/not-found/not-found.component';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
    {
        path: 'poke',
        component: LayoutComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./modules/init/init.module').then(
                        (i) => i.InitModule
                    ),
            },
            {
                path: '',
                loadChildren: () =>
                    import('./modules/auth/auth.module').then(
                        (a) => a.AuthModule
                    ),
            },
            {
                path: '',
                loadChildren: () =>
                    import('./modules/admin/admin.module').then(
                        (a) => a.AdminModule
                    ),
            },
        ],
    },
    { path: '', redirectTo: 'poke/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
