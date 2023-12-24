import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';

const routes: Routes = [
    { path: 'auth/profile', component: ProfileConfigComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
