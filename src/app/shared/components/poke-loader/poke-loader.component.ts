import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-poke-loader',
    templateUrl: './poke-loader.component.html',
    styleUrls: ['./poke-loader.component.scss'],
})
export class PokeLoaderComponent {
    @Input() content: string = 'Cargando...';
}
