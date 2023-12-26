import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ApiService } from './api.service';
import { DataBasePokemon, DataPokemon, Specie } from '../api/ResponseApi';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    private api$ = inject(ApiService);

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

        return await Promise.all(promises);
    }
}
