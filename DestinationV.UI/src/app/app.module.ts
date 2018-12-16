import { BrowserModule } from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { RoutesModule } from './routes/routes.module';
import { API_HOST } from './configs/api-host.config';
import { CURRENT_IANA_TIMEZONE } from './configs/timezone.config';
import { AngularMaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    RoutesModule,
    AngularMaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    { provide: API_HOST, useValue: environment.apiHost },
    { provide: CURRENT_IANA_TIMEZONE, useValue: environment.timezone }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
