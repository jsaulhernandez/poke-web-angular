import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: 'poke',
        component: LayoutComponent,
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
    { path: '', redirectTo: 'poke/list', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
