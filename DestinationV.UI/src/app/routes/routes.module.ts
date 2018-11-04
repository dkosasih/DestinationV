import { NgModule } from '@angular/core';
// import { RouteDataService } from './services/routes-data.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routesReducer } from './store/reducers';
import { RoutesEffects } from './store/effects/routes.effect';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('routesReducer', routesReducer),
    EffectsModule.forFeature([RoutesEffects])
  ],
  providers: []
})
export class RoutesModule { }
