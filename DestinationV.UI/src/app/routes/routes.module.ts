import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routesReducer } from './store/reducers';
import { RoutesEffects } from './store/effects/routes.effect';
import { RouteListComponent } from './components/route-list.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { UserTimezoneDatePipe } from '../common/pipes/user-timezone-date.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../material.module';
import { DateAdapter } from '@angular/material';
import { DestVDateAdapter } from '../common/helper/date/date-adapter';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    StoreModule.forFeature('routesReducer', routesReducer),
    EffectsModule.forFeature([RoutesEffects])
  ],
  declarations: [
    RouteListComponent,
    RouteDetailsComponent,

    UserTimezoneDatePipe
  ],
  providers: [
      {provide: DateAdapter, useClass: DestVDateAdapter},
  ],
})
export class RoutesModule { }
