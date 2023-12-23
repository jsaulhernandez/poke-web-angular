import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovesComponent } from './pages/moves/moves.component';

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'detail/:pokemon', component: DetailComponent },
    { path: 'moves', component: MovesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InitRoutingModule {}
