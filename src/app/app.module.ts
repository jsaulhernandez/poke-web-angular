import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import * as index from './layout';

import { pokeReducer } from './store/reducers/poke.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [AppComponent, ...index.LAYOUT],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot({ poke: pokeReducer }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
