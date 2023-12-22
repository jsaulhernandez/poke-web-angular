import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {
    Common,
    DataBasePokemon,
    DataPokemon,
} from 'src/app/data/api/ResponseApi';
import { SortBy } from 'src/app/data/interfaces/shared';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Generation } from '../../../../data/api/ResponseApi';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);

    // data
    generations: Common[] = [];
    versions: Common[] = [];
    types: Common[] = [];
    abilities: Common[] = [];
    pokemonsList: DataPokemon[] = [];
    mainList: DataPokemon[] = [];
    dataBasePokemon: DataBasePokemon[] = [];
    isLoading = this.loader$.loading$;

    // filters
    selectedGeneration: string = 'ALL';
    selectedVersion: string = 'ALL';
    searchByName: string = '';
    selectedType: string = 'ALL';
    selectedAbility: string = 'ALL';
    selectedSortBy: SortBy = 'POKEDEX_ASC';

    constructor(private loader$: LoaderService) {}

    ngOnInit(): void {
        this.getAllPokemons();
        this.getCommonData('GENERATIONS', 'generation');
        this.getCommonData('VERSIONS', 'version');
        this.getCommonData('TYPES', 'type');
        this.getCommonData('ABILITIES', 'ability');
    }

    ngOnDestroy(): void {}

    async getAllPokemons(limit = 25, offset = 0) {
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
            this.pokemonsList = this.mainList;
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getCommonData(
        option: 'GENERATIONS' | 'VERSIONS' | 'TYPES' | 'ABILITIES',
        path: string
    ) {
        try {
            const response = this.api$.request<Common[]>({
                method: 'GET',
                path,
            });
            const dataBase = (await lastValueFrom(response)).results ?? [];

            if (option === 'GENERATIONS') this.generations = dataBase;
            else if (option === 'VERSIONS') this.versions = dataBase;
            else if (option === 'TYPES') this.types = dataBase;
            else this.abilities = dataBase;

            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getPokemonsByGeneration() {
        if (this.selectedGeneration === 'ALL') {
            this.filterData();
            return;
        }

        this.loader$.show();
        this.dataBasePokemon = [];

        try {
            const response = this.api$.getDataPokemonByUrl<Generation>(
                this.selectedGeneration
            );

            const dataBase =
                (await lastValueFrom(response)) ?? ({} as Generation);

            this.dataBasePokemon = dataBase.pokemon_species;
            this.filterData();
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    filterData() {
        // filter data by generation
        if (this.selectedGeneration === 'ALL')
            this.pokemonsList = this.mainList;
        else
            this.pokemonsList = this.mainList.filter((p) => {
                return this.dataBasePokemon.find((p2) => p2.name === p.name);
            });

        // search by name
        if (this.searchByName.trim() !== '') {
            this.pokemonsList = this.pokemonsList.filter((p) =>
                p.name
                    .toLocaleLowerCase()
                    .includes(this.searchByName.trim().toLocaleLowerCase())
            );
        }

        //filter data by type
        if (this.selectedType !== 'ALL') {
            this.pokemonsList = this.pokemonsList.filter((p) => {
                return p.types.find((t) => t.type.name === this.selectedType);
            });
        }

        // filter by ability
        if (this.selectedAbility !== 'ALL') {
            this.pokemonsList = this.pokemonsList.filter((p) => {
                return p.abilities.find(
                    (t) => t.ability.name === this.selectedAbility
                );
            });
        }

        // filter by sort
        if (this.selectedSortBy === 'NAME_ASC') {
            this.pokemonsList = [
                ...this.pokemonsList.sort((a, b) =>
                    a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                        ? -1
                        : 1
                ),
            ];
        } else if (this.selectedSortBy === 'NAME_DESC') {
            this.pokemonsList = [
                ...this.pokemonsList.sort((a, b) =>
                    a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                        ? 1
                        : -1
                ),
            ];
        } else if (this.selectedSortBy === 'POKEDEX_ASC') {
        } else {
        }
        console.log(this.selectedSortBy);
    }

    async getDataPokemonByUrl(data: DataBasePokemon[]) {
        const promises = data.map(async (pokemon) => {
            const response = this.api$.getDataPokemonByUrl<DataPokemon>(
                pokemon.url
            );
            const data = (await lastValueFrom(response)) ?? ({} as DataPokemon);

            return data;
        });

        this.mainList = await Promise.all(promises);
    }
}
