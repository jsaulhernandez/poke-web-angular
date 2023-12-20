import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import * as auth from './index';

@NgModule({
    declarations: [...auth.AUTH_MODULE],
    imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
