import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import {
    DataPokemon,
    EvolutionChain,
    Move,
    Specie,
} from 'src/app/data/api/ResponseApi';
import { Evolution } from 'src/app/data/interfaces/evolution';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { PATHS } from 'src/app/data/constants';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);

    isLoading = this.loader$.loading$;
    pokemon!: DataPokemon;
    moves: string[] = [];
    evolutions: Evolution[] = [];
    firstElement: string = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private loader$: LoaderService,
        private router: Router
    ) {}

    async ngOnInit() {
        // getting param from URL
        await this.getPokemonByName(
            this.activatedRoute.snapshot.paramMap.get('pokemon') ?? ''
        );
    }

    ngOnDestroy(): void {}

    async getPokemonByName(pokemonName: string) {
        this.loader$.show();
        try {
            const dataBase = await this.getDataPokemon<DataPokemon>(
                pokemonName,
                PATHS.POKEMON
            );
            await this.getOtherData(dataBase);

            this.moves = this.transformMovesKey(this.pokemon.moves);
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getDataPokemon<T extends unknown>(
        pokemon: string | number,
        path: string
    ) {
        const response = this.api$.getDataPokemonByName<T>(
            `${path}/${pokemon}`
        );

        const dataBase = (await lastValueFrom(response)) ?? ({} as T);
        return dataBase;
    }

    async getOtherData(data: DataPokemon) {
        // getting specie
        const responseSpecie = this.api$.getDataPokemonByUrl<Specie>(
            data.species.url
        );
        let dataSpecie =
            (await lastValueFrom(responseSpecie)) ?? ({} as Specie);
        // adding specie to data pokemon
        data = {
            ...data,
            data_species: dataSpecie,
        };

        // getting evolutions
        const responseEvolution = this.api$.getDataPokemonByUrl<EvolutionChain>(
            dataSpecie.evolution_chain.url
        );
        let dataEvolution =
            (await lastValueFrom(responseEvolution)) ?? ({} as EvolutionChain);

        const firstID = dataEvolution.chain.species.url.split('/')[6];
        const firstDataPokemon = await this.getDataPokemon<DataPokemon>(
            firstID,
            PATHS.POKEMON
        );
        const firstSpecie = await this.getDataPokemon<Specie>(
            firstID,
            PATHS.POKEMON_SPECIES
        );

        this.evolutions.push({
            item: {
                name: dataEvolution.chain.species.name,
                url:
                    firstDataPokemon.sprites?.other['official-artwork']
                        ?.front_default ?? '',
            },
            color: firstSpecie.color,
            generation: firstSpecie.generation,
        });

        if (dataEvolution.chain.evolves_to.length > 0) {
            const secondDataEvolution =
                dataEvolution.chain.evolves_to[0].species;
            const secondID = secondDataEvolution.url.split('/')[6];
            const secondDataPokemon = await this.getDataPokemon<DataPokemon>(
                secondID,
                PATHS.POKEMON
            );
            const secondSpecie = await this.getDataPokemon<Specie>(
                firstID,
                PATHS.POKEMON_SPECIES
            );

            this.evolutions.push({
                item: {
                    name: secondDataEvolution.name,
                    url:
                        secondDataPokemon.sprites?.other['official-artwork']
                            ?.front_default ?? '',
                },
                color: secondSpecie.color,
                generation: secondSpecie.generation,
            });

            if (dataEvolution.chain.evolves_to[0].evolves_to.length > 0) {
                const thirdDataEvolution =
                    dataEvolution.chain.evolves_to[0].evolves_to[0].species;
                const thirdID = thirdDataEvolution.url.split('/')[6];
                const thirdDataPokemon = await this.getDataPokemon<DataPokemon>(
                    thirdID,
                    PATHS.POKEMON
                );
                const thirdSpecie = await this.getDataPokemon<Specie>(
                    firstID,
                    PATHS.POKEMON_SPECIES
                );

                this.evolutions.push({
                    item: {
                        name: thirdDataEvolution.name,
                        url:
                            thirdDataPokemon.sprites?.other['official-artwork']
                                ?.front_default ?? '',
                    },
                    color: thirdSpecie.color,
                    generation: thirdSpecie.generation,
                });
            }
        }

        this.firstElement =
            data.types.length > 0 ? data.types[0].type.name : 'unknown';
        this.pokemon = data;
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
