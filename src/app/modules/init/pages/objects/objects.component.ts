import { Component, OnDestroy, OnInit } from '@angular/core';
import { SortBy } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-objects',
    templateUrl: './objects.component.html',
    styleUrls: ['./objects.component.scss'],
})
export class ObjectsComponent implements OnInit, OnDestroy {
    // filters
    searchByName: string = '';
    selectedSortBy: SortBy = 'NAME_ASC';

    ngOnInit(): void {}
    ngOnDestroy(): void {}

    filterData() {}
}
