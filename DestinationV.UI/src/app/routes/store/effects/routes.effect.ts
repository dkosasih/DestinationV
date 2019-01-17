import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoadRoutes, RouteTypes, LoadRouteComplete, DeleteRoute, DeleteRouteComplete, UpdateRoute, UpdateRouteComplete } from '../actions/routes.action';
import { map, switchMap, catchError, exhaustMap, concatMap } from 'rxjs/operators';
import { RouteDataService } from '../../services/routes-data.service';
import { ActionResult } from 'src/app/common/dtos/action-result.dto';
import { MatSnackBarConfig } from '@angular/material';
import { SnackBarService } from 'src/app/common/services/snackbar.service';

@Injectable()
export class RoutesEffects {
  constructor(
    private actions$: Actions,
    private routesDataService: RouteDataService,
    private snackBarService: SnackBarService
  ) { }

  @Effect()
  loadRoutes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadRoutes>(RouteTypes.LoadRoutes),
    switchMap(route => this.routesDataService.getRoutes().pipe(
      map(res => new LoadRouteComplete(res)),
      catchError(err => of(new LoadRouteComplete([])))
    ))
  );

  @Effect()
  deleteRoute$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteRoute>(RouteTypes.DeleteRoute),
    map(dr => dr.id),
    exhaustMap(id => this.routesDataService.deleteRoute(id).pipe(
      map(x => new DeleteRouteComplete(new ActionResult(null, true, false, id))),
      catchError(err => of(new DeleteRouteComplete(new ActionResult('Error', false, true, id))))
    ))
  );

  @Effect()
  updateRoute$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateRoute>(RouteTypes.UpdateRoute),
    map(dr => dr.payload),
    concatMap(routeItem => this.routesDataService.updateRoute(routeItem.id, routeItem).pipe(
      map(x => new UpdateRouteComplete(new ActionResult(null, true, false, routeItem))),
      catchError(err => of(new UpdateRouteComplete(new ActionResult('Error', false, true, routeItem))))
    ))
  );
}
