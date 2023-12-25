import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { DataPokemon, Type } from 'src/app/data/api/ResponseApi';

import { FontFamily } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-poke-media',
    templateUrl: './poke-media.component.html',
    styleUrls: ['./poke-media.component.scss'],
})
export class PokeMediaComponent {
    @Input() pokeData!: DataPokemon;
    @Input() option: 'MEDIA' | 'STATS' = 'MEDIA';
    @Input() heightImage: number = 276;
    @Input() showBaseStat: boolean = false;
    @Input() fontFamily: FontFamily = 'BOLD';
    @Input() element: string = 'unknown';

    processTypes(types: Type[]): string {
        return types.map((t) => t.type.name).join('/');
    }

    transformStatKey(value: string) {
        switch (value) {
            case 'hp':
                return 'HP';
            case 'attack':
                return 'Attack';
            case 'defense':
                return 'Defense';
            case 'special-attack':
                return 'Special Attack';
            case 'special-defense':
                return 'Special Defense';

            default:
                return 'Speed';
        }
    }

    getStatWidth(i: number) {
        let total = 0;
        switch (i) {
            case 0:
                total = 255;
                break;
            case 1:
                total = 190;
                break;
            case 2:
                total = 250;
                break;
            case 3:
                total = 194;
                break;
            case 4:
                total = 250;
                break;
            case 5:
                total = 200;
                break;
        }

        return (this.pokeData.stats[i].base_stat / total) * 100;
    }
}
