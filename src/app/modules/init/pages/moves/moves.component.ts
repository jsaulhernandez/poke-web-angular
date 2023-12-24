import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CustomMove } from 'src/app/data/interfaces/custom-move';
import { Common, Move } from 'src/app/data/api/ResponseApi';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SortBy } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-moves',
    templateUrl: './moves.component.html',
    styleUrls: ['./moves.component.scss'],
})
export class MovesComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);

    displayedColumns: string[] = [
        'name',
        'type',
        'cat',
        'description',
        'priority',
        'critical_rate',
        'flinch_chance',
        'power',
        'acc',
        'pp',
    ];
    dataSource: CustomMove[] = [];
    mainList: CustomMove[] = [];
    types: Common[] = [];
    categories: Common[] = [];
    isLoading = this.loader$.loading$;
    // filters
    searchByName: string = '';
    selectedType: string = 'ALL';
    selectedCategory: string = 'ALL';
    selectedSortBy: SortBy = 'NAME_ASC';

    constructor(private loader$: LoaderService) {}

    async ngOnInit(): Promise<void> {
        this.getCommonData('TYPES', 'type');
        this.getCommonData('CATEGORIES', 'move-category');
        this.getAllMoves();
    }

    ngOnDestroy(): void {}

    async getAllMoves() {
        this.loader$.show();
        try {
            const response = this.api$.request<Common[]>({
                method: 'GET',
                path: 'move',
            });

            const dataBase = (await lastValueFrom(response)).results ?? [];
            await this.getDataForEachMove(dataBase);
            this.dataSource = this.mainList;
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getDataForEachMove(moves: Common[]) {
        const promises = moves.map(async (m) => {
            let data = {} as CustomMove;
            // getting data for each pokemon
            const response = this.api$.getDataPokemonByUrl<Move>(m.url);
            let moveDetail = (await lastValueFrom(response)) ?? ({} as Move);

            //setting data to object
            data.name = moveDetail.name.replaceAll('-', ' ');
            data.type = moveDetail.type.name;
            data.cat = moveDetail.meta.category.name;
            data.power = `${moveDetail.power ?? '-'}`;
            data.acc = `${
                moveDetail.accuracy ? moveDetail.accuracy + '%' : '-'
            }`;
            data.pp = `${moveDetail.pp ?? '-'}`;
            data.priority = `${moveDetail.priority}`;
            data.criticalRate = `${moveDetail.meta.crit_rate}`;
            data.flinchChance = `${moveDetail.meta.flinch_chance}`;
            data.descriptionEffect =
                moveDetail.effect_entries.length > 0
                    ? moveDetail.effect_entries[0].effect.replaceAll(
                          '$effect_chance',
                          `${moveDetail.effect_chance}`
                      )
                    : '-';

            return data;
        });

        this.mainList = await Promise.all(promises);
    }

    async getCommonData(option: 'TYPES' | 'CATEGORIES', path: string) {
        try {
            const response = this.api$.request<Common[]>({
                method: 'GET',
                path,
            });
            const dataBase = (await lastValueFrom(response)).results ?? [];

            if (option === 'TYPES') this.types = dataBase;
            else this.categories = dataBase;

            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    filterData() {
        if (this.searchByName.trim() !== '') {
            this.dataSource = this.mainList.filter((m) =>
                m.name
                    .toLocaleLowerCase()
                    .includes(this.searchByName.toLocaleLowerCase())
            );
        } else {
            this.dataSource = this.mainList;
        }

        if (this.selectedType !== 'ALL') {
            console.log(this.selectedType);
            this.dataSource = this.dataSource.filter(
                (m) => m.type === this.selectedType
            );
        }

        if (this.selectedCategory !== 'ALL') {
            this.dataSource = this.dataSource.filter(
                (m) => m.cat === this.selectedCategory
            );
        }

        if (this.selectedSortBy === 'NAME_ASC') {
            this.dataSource = [
                ...this.dataSource.sort((a, b) =>
                    a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                        ? -1
                        : 1
                ),
            ];
        }

        if (this.selectedSortBy === 'NAME_DESC') {
            this.dataSource = [
                ...this.dataSource.sort((a, b) =>
                    a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()
                        ? 1
                        : -1
                ),
            ];
        }
    }

    transformCategoryText(value: string) {
        return value.replaceAll('-', ' ').replaceAll('+', ' / ');
    }
}
