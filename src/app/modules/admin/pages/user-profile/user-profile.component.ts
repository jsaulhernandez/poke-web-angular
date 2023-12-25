import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/store';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {}

    ngOnInit(): void {
        this.subscriber = this.store
            .select('poke')
            .subscribe(({ pokemons, user }) => {
                console.log(pokemons, user);
            });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
