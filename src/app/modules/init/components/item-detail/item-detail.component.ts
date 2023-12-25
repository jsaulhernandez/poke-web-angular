import { Component, Input } from '@angular/core';
import { Evolution } from 'src/app/data/interfaces/evolution';

@Component({
    selector: 'app-item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent {
    @Input() dataEvolution!: Evolution;
}
