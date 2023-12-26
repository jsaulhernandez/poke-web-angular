import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Image, User } from 'src/app/data/interfaces/user';

import { GlobalState } from 'src/app/store';
import { addUser, cleanStore } from 'src/app/store/actions/poke.action';

import { HOBBIES } from 'src/app/data/constants';

@Component({
    selector: 'app-profile-config',
    templateUrl: './profile-config.component.html',
    styleUrls: ['./profile-config.component.scss'],
})
export class ProfileConfigComponent {
    resource?: Image;
    userData?: User;

    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {
        this.subscriber = this.store.select('poke').subscribe(({ user }) => {
            this.userData = user;
            this.resource = user.resource;
        });
    }

    onNext(user: User) {
        const userData: User = {
            ...user,
            resource: this.resource,
        };

        this.store.dispatch(addUser({ data: userData }));
        this.onNavigation('NEXT');
    }

    onNavigation(action: 'PREVIOUS' | 'NEXT' = 'PREVIOUS') {
        if (action === 'NEXT')
            this.router.navigate(['/poke/auth/select-pokemon']);
        else {
            this.store.dispatch(cleanStore());
            this.router.navigate(['/poke/home']);
        }
    }
}
