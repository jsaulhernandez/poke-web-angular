import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from 'src/app/data/interfaces/user';

import { GlobalState } from 'src/app/store';
import { addSelectedPokemons } from 'src/app/store/actions/poke.action';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import {
    DataBasePokemon,
    DataPokemon,
    Specie,
} from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-select-pokemon',
    templateUrl: './select-pokemon.component.html',
    styleUrls: ['./select-pokemon.component.scss'],
})
export class SelectPokemonComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);

    isLoading = this.loader$.loading$;
    userData!: User;
    mainList: DataPokemon[] = [];

    subscriber!: Subscription;

    constructor(
        private router: Router,
        private loader$: LoaderService,
        private store: Store<GlobalState>
    ) {}

    ngOnInit(): void {
        this.subscriber = this.store.select('poke').subscribe(({ user }) => {
            this.userData = user;
        });

        this.getAllPokemons();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
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
                addSelectedPokemons({
                    pokemons: selectedPokemons,
                    isLoggedIn: true,
                })
            );

            this.onNavigation('NEXT');
        } else {
            console.warn('[Empty]', 'Select pokemons');
        }
    }

    onNavigation(action: 'PREVIOUS' | 'NEXT' = 'PREVIOUS') {
        if (action === 'NEXT') this.router.navigate(['/poke/admin/profile']);
        else this.router.navigate(['/poke/auth/profile-config']);
    }
}
