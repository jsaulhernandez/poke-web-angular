import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CustomObject } from '../../../../data/interfaces/custom-object';
import { Common, Item } from 'src/app/data/api/ResponseApi';

import { ApiService } from 'src/app/data/services/api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { SortBy } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-objects',
    templateUrl: './objects.component.html',
    styleUrls: ['./objects.component.scss'],
})
export class ObjectsComponent implements OnInit, OnDestroy {
    api$ = inject(ApiService);
    isLoading = this.loader$.loading$;

    // data
    displayedColumns: string[] = [
        'name',
        'short_effect',
        'effect',
        'attributes',
        'category',
        'cost',
    ];
    dataSource: CustomObject[] = [];
    mainList: CustomObject[] = [];

    // filters
    searchByName: string = '';
    selectedSortBy: SortBy = 'NAME_ASC';

    constructor(private loader$: LoaderService) {}

    ngOnInit(): void {
        this.getAllItems();
    }

    ngOnDestroy(): void {}

    async getAllItems() {
        this.loader$.show();
        try {
            const response = this.api$.request<Common[]>({
                method: 'GET',
                path: 'item',
            });

            const dataBase = (await lastValueFrom(response)).results ?? [];
            await this.getDataForEachItem(dataBase);
            this.dataSource = this.mainList;
            this.loader$.hide();
        } catch (error) {
            console.error('[Error]', error);
            this.loader$.hide();
        }
    }

    async getDataForEachItem(items: Common[]) {
        const promises = items.map(async (i) => {
            let data = {} as CustomObject;
            // getting data for each object
            const response = this.api$.getDataPokemonByUrl<Item>(i.url);
            let itemDetail = (await lastValueFrom(response)) ?? ({} as Item);

            // Setting data to object
            data.name = itemDetail.name;
            data.attributes = itemDetail.attributes;
            data.category = itemDetail.category.name;
            data.cost = `${itemDetail.cost}`;
            data.image = itemDetail.sprites.default;
            if (itemDetail.effect_entries.length > 0) {
                data.effect = itemDetail.effect_entries[0].effect;
                data.shortEffect = itemDetail.effect_entries[0].short_effect;
            } else {
                data.effect = '-';
                data.shortEffect = '-';
            }

            return data;
        });

        this.mainList = await Promise.all(promises);
    }

    filterData() {
        if (this.searchByName.trim() !== '') {
            this.dataSource = this.mainList.filter((i) =>
                i.name
                    .toLocaleLowerCase()
                    .includes(this.searchByName.toLocaleLowerCase())
            );
        } else this.dataSource = this.mainList;

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

    transformItemText(value: string) {
        return value.replaceAll('-', ' ');
    }
}
