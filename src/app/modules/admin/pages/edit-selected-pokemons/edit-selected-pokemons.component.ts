import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';

import { GlobalState } from 'src/app/store';
import { updateSelectedPokemons } from 'src/app/store/actions/poke.action';

import { ApiService } from 'src/app/data/services/api.service';
import { CommonService } from 'src/app/data/services/common.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { DataBasePokemon, DataPokemon } from 'src/app/data/api/ResponseApi';

@Component({
    selector: 'app-edit-selected-pokemons',
    templateUrl: './edit-selected-pokemons.component.html',
    styleUrls: ['./edit-selected-pokemons.component.scss'],
})
export class EditSelectedPokemonsComponent implements OnInit {
    api$ = inject(ApiService);
    common$ = inject(CommonService);

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

            this.mainList = await this.common$.getDataPokemonByUrl(dataBase);
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
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
