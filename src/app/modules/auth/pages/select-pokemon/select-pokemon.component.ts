import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from 'src/app/data/interfaces/user';

import { GlobalState } from 'src/app/store';
import { addSelectedPokemons } from 'src/app/store/actions/poke.action';

import { ApiService } from 'src/app/data/services/api.service';
import { CommonService } from 'src/app/data/services/common.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { DataBasePokemon, DataPokemon } from 'src/app/data/api/ResponseApi';
import { PATHS, TOTAL_POKEMONS } from 'src/app/data/constants';

@Component({
    selector: 'app-select-pokemon',
    templateUrl: './select-pokemon.component.html',
    styleUrls: ['./select-pokemon.component.scss'],
})
export class SelectPokemonComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);
    common$ = inject(CommonService);

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

    async getAllPokemons(limit = TOTAL_POKEMONS, offset = 0) {
        this.loader$.show();
        try {
            const response = this.api$.request<DataBasePokemon[]>({
                method: 'GET',
                path: PATHS.POKEMON,
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
        else this.router.navigate(['/poke/auth/config-profile']);
    }
}
