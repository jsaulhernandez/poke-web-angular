import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FontFamily, TypeButton } from 'src/app/data/interfaces/shared';

@Component({
    selector: 'app-poke-button',
    templateUrl: './poke-button.component.html',
    styleUrls: ['./poke-button.component.scss'],
})
export class PokeButtonComponent {
    @Input() icon?: string;
    @Input() content: string = '';
    @Input() fontSize: string = '1em';
    @Input() isLoading: boolean = false;
    @Input() isDisabled: boolean = false;
    @Input() fontFamily: FontFamily = 'BOLD';
    @Input() typeButton: TypeButton = 'ENABLED';
    @Input() widthBreakPoints: string[] = ['100%', '100%', '100%'];

    customWidth = '100%';
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
                    this.customWidth = this.widthBreakPoints[0];
                }

                if (
                    state.breakpoints[Breakpoints.Medium] ||
                    state.breakpoints[Breakpoints.Large]
                ) {
                    this.customWidth = this.widthBreakPoints[1];
                }

                if (state.breakpoints[Breakpoints.XLarge]) {
                    this.customWidth = this.widthBreakPoints[2];
                }
            });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
