import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from './material.module';

import * as shared from './components/index';

@NgModule({
    declarations: [...shared.SHARED_COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ScrollingModule,
        MaterialModule,
    ],
    exports: [
        ...shared.SHARED_COMPONENTS,
        ReactiveFormsModule,
        FormsModule,
        ScrollingModule,
        MaterialModule,
    ],
})
export class SharedModule {}
