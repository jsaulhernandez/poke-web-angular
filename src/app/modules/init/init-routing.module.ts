import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovesComponent } from './pages/moves/moves.component';
import { ObjectsComponent } from './pages/objects/objects.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'detail/:pokemon', component: DetailComponent },
    { path: 'moves', component: MovesComponent },
    { path: 'objects', component: ObjectsComponent },
    { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InitRoutingModule {}
