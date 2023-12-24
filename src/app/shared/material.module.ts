import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { es } from 'date-fns/locale';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    exports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: DateFnsAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_LOCALE, useValue: es },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
})
export class MaterialModule {}
