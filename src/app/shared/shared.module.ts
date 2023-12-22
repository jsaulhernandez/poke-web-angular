import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import * as shared from './components/index';

@NgModule({
    declarations: [...shared.SHARED_COMPONENTS],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
    exports: [
        ...shared.SHARED_COMPONENTS,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
    ],
})
export class SharedModule {}
