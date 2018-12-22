import { BrowserModule } from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { globalReducers, metaReducers } from './store/reducers';
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
    AngularMaterialModule,
    RoutesModule,
    StoreModule.forRoot(globalReducers, { metaReducers }),
    StoreModule.forFeature('globalReducer', globalReducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: API_HOST, useValue: environment.apiHost },
    { provide: CURRENT_IANA_TIMEZONE, useValue: environment.timezone }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
