import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';

import {
    DataPokemon,
} from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-pokemons-selection',
    templateUrl: './pokemons-selection.component.html',
    styleUrls: ['./pokemons-selection.component.scss'],
})
export class PokemonsSelectionComponent implements OnInit, OnDestroy {
    @Input() pokemonsList: DataPokemon[] = [];
    @Input() showItems: number = 3;
    @Output() outputData = new EventEmitter<DataPokemon[]>();

    pokemonsFilters: DataPokemon[] = [];

    // filters
    searchByName: string = '';
    selectedPokemons: DataPokemon[] = [];

    constructor() {}

    ngOnInit(): void {
        this.pokemonsFilters = this.pokemonsList;
    }

    ngOnDestroy(): void {
        this.pokemonsList = [];
        this.selectedPokemons = [];
    }

    filterData() {
        if (this.searchByName.trim() !== '') {
            this.pokemonsFilters = this.pokemonsFilters.filter(
                (p) =>
                    p.name
                        .toLocaleLowerCase()
                        .includes(
                            this.searchByName.trim().toLocaleLowerCase()
                        ) ||
                    p.data_species.pokedex_numbers.find(
                        (pkn) =>
                            pkn.entry_number.toString() === this.searchByName
                    )
            );
        } else this.pokemonsFilters = this.pokemonsList;
    }

    onSelectedPokemon(pokemon: DataPokemon) {
        const findPokemon = this.selectedPokemons.find(
            (pk) => pk.name === pokemon.name
        );

        if (findPokemon)
            this.selectedPokemons = this.selectedPokemons.filter(
                (pk) => pk.name !== findPokemon.name
            );
        else this.selectedPokemons.push(pokemon);
    }

    onVerifiedPokemon(pokemon: DataPokemon) {
        const result = this.selectedPokemons.find(
            (pk) => pk.name === pokemon.name
        );

        return !!result;
    }

    generateOpacity(pokemon: DataPokemon) {
        if (this.selectedPokemons.length === 3) {
            const result = this.selectedPokemons.find(
                (pk) => pk.name === pokemon.name
            );

            if (!result) return '0.5';
        }

        return '1';
    }

    sendData() {
        if (this.selectedPokemons.length === 3)
            this.outputData.emit(this.selectedPokemons);
        else console.warn('[Empty]', 'Select pokemons');
    }
}
