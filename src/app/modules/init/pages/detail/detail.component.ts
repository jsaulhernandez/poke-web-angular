import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DataPokemon, Move, Type } from 'src/app/data/api/ResponseApi';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);

    pokemonName: string = '';
    isLoading = this.loader$.loading$;
    pokemon!: DataPokemon;
    moves: string[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private loader$: LoaderService,
        private router: Router
    ) {}

    async ngOnInit() {
        // getting param from URL
        this.pokemonName =
            this.activatedRoute.snapshot.paramMap.get('pokemon') ?? '';
        await this.getPokemonByName();
        if (this.pokemon)
            this.moves = this.transformMovesKey(this.pokemon.moves);
    }

    ngOnDestroy(): void {}

    async getPokemonByName() {
        this.loader$.show();
        try {
            const response = this.api$.getDataPokemonByName<DataPokemon>(
                `pokemon/${this.pokemonName}`
            );

            const dataBase = (await lastValueFrom(response)) ?? [];
            await this.getOtherData(dataBase);
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getOtherData(data: DataPokemon) {
        this.pokemon = data;
    }

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
                return 'HP';
            case 'Special Attack':
                return 'HP';
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

        return (this.pokemon.stats[i].base_stat / total) * 100;
    }

    transformMovesKey(moves: Move[]) {
        return moves.map((m) => {
            return m.move.name.replace('-', ' ');
        });
    }

    onRedirectToList() {
        this.router.navigate(['/poke/list']);
    }
}
