import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
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
    hobbies = HOBBIES;
    resource?: Image;
    userData?: User;
    userDataForm!: UntypedFormGroup;

    subscriber!: Subscription;

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private store: Store<GlobalState>
    ) {
        this.userDataForm = this.fb.group({
            name: [null, [Validators.required]],
            hobbies: [[]],
            dateBirth: [null, [Validators.required]],
            document: [null, [Validators.required]],
        });

        this.subscriber = this.store.select('poke').subscribe(({ user }) => {
            this.userDataForm.patchValue(user);
            this.userData = user;
            this.resource = user.resource;
        });
    }

    onNext() {
        const { name, hobbies, dateBirth, document } = this.userDataForm.value;
        const userData: User = {
            dateBirth,
            name,
            hobbies,
            document,
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
            this.router.navigate(['/poke/list']);
        }
    }
}
