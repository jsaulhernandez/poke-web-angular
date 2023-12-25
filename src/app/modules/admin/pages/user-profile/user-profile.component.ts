import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/data/interfaces/user';

import { DataPokemon } from 'src/app/data/api/ResponseApi';

import { GlobalState } from 'src/app/store';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
    userData?: User;
    selectedPokemons: DataPokemon[] = [];

    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {}

    ngOnInit(): void {
        this.subscriber = this.store
            .select('poke')
            .subscribe(({ pokemons, user }) => {
                this.userData = user;
                this.selectedPokemons = pokemons;
            });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    onNavigation(option: 'EDIT_PROFILE' | 'EDIT_SELECTED' = 'EDIT_PROFILE') {
        if (option === 'EDIT_PROFILE')
            this.router.navigate(['/poke/admin/edit']);
        else this.router.navigate(['/poke/admin/edit-selected']);
    }
}
