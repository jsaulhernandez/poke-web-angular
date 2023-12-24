import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GlobalState } from 'src/app/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-pokemon',
    templateUrl: './select-pokemon.component.html',
    styleUrls: ['./select-pokemon.component.scss'],
})
export class SelectPokemonComponent implements OnInit, OnDestroy {
    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {}

    ngOnInit(): void {
        this.subscriber = this.store.select('poke').subscribe(({ user }) => {
            console.log(user);
        });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    onNavigation(action: 'PREVIOUS' | 'NEXT' = 'PREVIOUS') {
        if (action === 'NEXT')
            this.router.navigate(['/poke/auth/select-pokemon']);
        else this.router.navigate(['/poke/auth/profile-config']);
    }
}
