import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Image, User } from 'src/app/data/interfaces/user';

import { GlobalState } from 'src/app/store';
import { updateUserData } from 'src/app/store/actions/poke.action';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
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

        this.store.dispatch(updateUserData({ data: userData }));
        this.onNavigation();
    }

    onNavigation() {
        this.router.navigate(['/poke/admin/profile']);
    }
}
