import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitRoutingModule } from './init-routing.module';

import * as init from './index';

@NgModule({
    declarations: [...init.INIT_MODULE],
    imports: [CommonModule, InitRoutingModule],
})
export class InitModule {}
