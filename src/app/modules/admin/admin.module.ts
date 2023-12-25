import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import * as admin from './index';

@NgModule({
    declarations: [...admin.ADMIN_MODULE],
    imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
