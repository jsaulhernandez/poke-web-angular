import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { InitRoutingModule } from './init-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import * as init from './index';

@NgModule({
    declarations: [...init.INIT_MODULE],
    imports: [CommonModule, InitRoutingModule, ScrollingModule, SharedModule],
})
export class InitModule {}
