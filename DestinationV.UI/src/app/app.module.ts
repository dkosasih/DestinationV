import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouteListComponent } from './routes/components/route-list.component';
import { RoutesModule } from './routes/routes.module';
import { API_HOST } from './configs/api-host.config';
import { CURRENT_IANA_TIMEZONE } from './configs/timezone.config';
import { UserTimezoneDatePipe } from './common/pipes/user-timezone-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RouteListComponent,
    UserTimezoneDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutesModule,
    CollapseModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    { provide: API_HOST, useValue: environment.apiHost }
    { provide: CURRENT_IANA_TIMEZONE, useValue: environment.timezone }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
