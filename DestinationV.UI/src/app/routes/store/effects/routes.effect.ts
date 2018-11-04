import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoadRoutes, RouteTypes, LoadRouteComplete } from '../actions/routes.action';
import { map, switchMap } from 'rxjs/operators';
import { RouteDataService } from '../../services/routes-data.service';

@Injectable()
export class RoutesEffects {
  constructor(private actions$: Actions, private routesDateService: RouteDataService) {}

  @Effect()
  loadRoutes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadRoutes>(RouteTypes.LoadRoutes),
    switchMap(route => this.routesDateService.getRoutes().pipe(
      map(res => new LoadRouteComplete(res))

    ))
  );
}
