import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';

import { GlobalState } from 'src/app/store';
import { updateSelectedPokemons } from 'src/app/store/actions/poke.action';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import {
    DataBasePokemon,
    DataPokemon,
    Specie,
} from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-edit-selected-pokemons',
    templateUrl: './edit-selected-pokemons.component.html',
    styleUrls: ['./edit-selected-pokemons.component.scss'],
})
export class EditSelectedPokemonsComponent implements OnInit {
    api$ = inject(ApiService);

    isLoading = this.loader$.loading$;
    mainList: DataPokemon[] = [];

    constructor(
        private router: Router,
        private loader$: LoaderService,
        private store: Store<GlobalState>
    ) {}

    ngOnInit(): void {
        this.getAllPokemons();
    }

    async getAllPokemons(limit = 50, offset = 0) {
        this.loader$.show();
        try {
            const response = this.api$.request<DataBasePokemon[]>({
                method: 'GET',
                path: 'pokemon',
                params: {
                    limit: `${limit}`,
                    offset: `${offset}`,
                },
            });

            const dataBase = (await lastValueFrom(response)).results ?? [];

            await this.getDataPokemonByUrl(dataBase);
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getDataPokemonByUrl(data: DataBasePokemon[]) {
        const promises = data.map(async (pokemon) => {
            // getting data for each pokemon
            const response = this.api$.getDataPokemonByUrl<DataPokemon>(
                pokemon.url
            );
            let data = (await lastValueFrom(response)) ?? ({} as DataPokemon);

            // getting specie for each pokemon
            const responseSpecie = this.api$.getDataPokemonByUrl<Specie>(
                data.species.url
            );
            let dataSpecie =
                (await lastValueFrom(responseSpecie)) ?? ({} as Specie);

            // filtering entries by en
            dataSpecie = {
                ...dataSpecie,
                flavor_text_entries: dataSpecie.flavor_text_entries.filter(
                    (s) => s.language.name === 'en'
                ),
                pokedex_numbers: dataSpecie.pokedex_numbers.filter(
                    (pn) => pn.pokedex.name === 'national'
                ),
            };

            // adding result to pokemon data
            data = {
                ...data,
                data_species: dataSpecie,
            };

            return data;
        });

        this.mainList = await Promise.all(promises);
    }

    onNext(selectedPokemons: DataPokemon[]) {
        if (selectedPokemons.length === 3) {
            this.store.dispatch(
                updateSelectedPokemons({
                    pokemons: selectedPokemons,
                })
            );

            this.onNavigation();
        } else {
            console.warn('[Empty]', 'Select pokemons');
        }
    }

    onNavigation() {
        this.router.navigate(['/poke/admin/profile']);
    }
}
