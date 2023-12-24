import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-config',
    templateUrl: './profile-config.component.html',
    styleUrls: ['./profile-config.component.scss'],
})
export class ProfileConfigComponent {
    toppingList: string[] = [
        'Extra cheese',
        'Mushroom',
        'Onion',
        'Pepperoni',
        'Sausage',
        'Tomato',
    ];

    constructor(private router: Router) {}

    onGoToHome() {
        this.router.navigate(['/poke/list']);
    }
}
