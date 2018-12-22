import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LoadPlaces, PlaceTypes, LoadPlacesComplete } from '../actions/places.action';
import { switchMap, catchError, map } from 'rxjs/operators';
import { PlaceDataService } from 'src/app/common/services/places-data.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private placesDataService: PlaceDataService
  ) { }

  @Effect()
  loadPlaces$: Observable<Action> = this.actions$.pipe(
    ofType<LoadPlaces>(PlaceTypes.loadPlaces),
    switchMap(place => this.placesDataService.getPlaces().pipe(
      map(res => new LoadPlacesComplete(res)),
      catchError(err => of(new LoadPlacesComplete([])))
    ))
  );
}
