import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GlobalState } from 'src/app/store';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean = false;
    subscriber!: Subscription;

    constructor(private router: Router, private store: Store<GlobalState>) {}

    ngOnInit(): void {
        this.subscriber = this.store
            .select('poke')
            .subscribe(({ isLoggedIn }) => {
                this.isLoggedIn = isLoggedIn;
            });
    }

    ngOnDestroy(): void {}

    onNavigate() {
        if (this.isLoggedIn) this.router.navigate(['/poke/admin/profile']);
        else this.router.navigate(['/poke/home']);
    }
}
