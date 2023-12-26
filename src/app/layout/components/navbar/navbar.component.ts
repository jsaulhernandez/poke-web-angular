import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/data/interfaces/user';

import { GlobalState } from 'src/app/store';
import { cleanStore } from 'src/app/store/actions/poke.action';

export declare type options = 'PROFILE' | 'MOVES' | 'LIST' | 'ITEMS' | 'LOGOUT';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    userData?: User;
    isLoggedIn: boolean = false;
    firstName: string = '';
    select: { value: string; option: options }[] = [
        {
            option: 'LIST',
            value: 'Pokemons List',
        },

        {
            option: 'MOVES',
            value: 'Moves',
        },
        {
            option: 'ITEMS',
            value: 'Objects',
        },
        {
            option: 'LOGOUT',
            value: 'Log out',
        },
    ];

    // filter
    selectedOption: options = 'PROFILE';

    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {}

    ngOnInit(): void {
        this.subscriber = this.store
            .select('poke')
            .subscribe(({ user, isLoggedIn }) => {
                this.userData = user;
                this.isLoggedIn = isLoggedIn;
                this.firstName = user.name.split(' ')[0];
            });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    onChangeSelection() {
        switch (this.selectedOption) {
            case 'LIST':
                this.router.navigate(['/poke/list']);
                break;

            case 'MOVES':
                this.router.navigate(['/poke/moves']);
                break;
            case 'ITEMS':
                this.router.navigate(['/poke/objects']);
                break;
            case 'LOGOUT':
                this.store.dispatch(cleanStore());
                this.router.navigate(['/poke/home']);
                break;
            default:
                this.router.navigate(['/poke/admin/profile']);
                break;
        }
    }

    onNavigation() {
        if (this.isLoggedIn) {
            this.selectedOption = 'LIST';
            this.router.navigate(['/poke/list']);
        } else this.router.navigate(['/poke/home']);
    }
}
