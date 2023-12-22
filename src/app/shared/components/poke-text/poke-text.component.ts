import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { FontFamily, TextColor } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-poke-text',
    templateUrl: './poke-text.component.html',
    styleUrls: ['./poke-text.component.scss'],
})
export class PokeTextComponent implements OnInit, OnDestroy {
    @Input() text: string = '';
    @Input() margin: string = '0';
    @Input() fontFamily: FontFamily = 'NORMAL';
    @Input() textColor: TextColor | string = 'DARK_BLUE_2';
    @Input() fontSizeBreakPoints: string[] = ['1em', '1em', '1em'];

    fontSize: string = '1em';

    subscriber!: Subscription;

    constructor(private breakpointObserver: BreakpointObserver) {}

    ngOnInit(): void {
        this.subscriber = this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((state) => {
                if (
                    state.breakpoints[Breakpoints.XSmall] ||
                    state.breakpoints[Breakpoints.Small]
                ) {
                    this.fontSize = this.fontSizeBreakPoints[0];
                }

                if (
                    state.breakpoints[Breakpoints.Medium] ||
                    state.breakpoints[Breakpoints.Large]
                ) {
                    this.fontSize = this.fontSizeBreakPoints[1];
                }

                if (state.breakpoints[Breakpoints.XLarge]) {
                    this.fontSize = this.fontSizeBreakPoints[2];
                }
            });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
