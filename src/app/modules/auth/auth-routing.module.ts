import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';
import { SelectPokemonComponent } from './pages/select-pokemon/select-pokemon.component';

const routes: Routes = [
    { path: 'auth/config-profile', component: ProfileConfigComponent },
    { path: 'auth/select-pokemon', component: SelectPokemonComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
