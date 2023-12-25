import { Component, Input } from '@angular/core';
import { DataPokemon } from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-selected-pokemon',
    templateUrl: './selected-pokemon.component.html',
    styleUrls: ['./selected-pokemon.component.scss'],
})
export class SelectedPokemonComponent {
    @Input() pokeData!: DataPokemon;

    getElement() {
        return this.pokeData.types.length > 0
            ? this.pokeData.types[0].type.name
            : 'unknown';
    }
}
