import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import * as shared from './components/index';

@NgModule({
    declarations: [...shared.SHARED_COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RouterModule,
    ],
    exports: [
        ...shared.SHARED_COMPONENTS,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
    ],
})
export class SharedModule {}
