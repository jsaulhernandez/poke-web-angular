import { Component, Input } from '@angular/core';
import { DataPokemon } from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-poke-item',
    templateUrl: './poke-item.component.html',
    styleUrls: ['./poke-item.component.scss'],
})
export class PokeItemComponent {
    @Input() data!: DataPokemon;
    @Input() showAdditionalData: boolean = false;

    generatePokeNumber(pokeNumber: number): string {
        if (pokeNumber < 10) return `#00${pokeNumber}`;
        else if (pokeNumber < 100) return `#0${pokeNumber}`;

        return `#${pokeNumber}`;
    }
}
