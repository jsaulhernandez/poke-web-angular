import { Component, Input } from '@angular/core';
import { DataPokemon } from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-poke-item',
    templateUrl: './poke-item.component.html',
    styleUrls: ['./poke-item.component.scss'],
})
export class PokeItemComponent {
    @Input() data!: DataPokemon;
}
