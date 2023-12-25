import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditSelectedPokemonsComponent } from './pages/edit-selected-pokemons/edit-selected-pokemons.component';

const routes: Routes = [
    { path: 'admin/profile', component: UserProfileComponent },
    { path: 'admin/edit', component: EditProfileComponent },
    { path: 'admin/edit-selected', component: EditSelectedPokemonsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
