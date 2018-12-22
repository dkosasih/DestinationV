import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRoutes, RouteState } from '../store/reducers';
import { RouteDto } from '../dtos/route.dto';
import { Observable } from 'rxjs';
import { LoadRoutes } from '../store/actions/routes.action';
import { take, tap } from 'rxjs/operators';
import { GlobalState, getPlaces } from 'src/app/store/reducers';
import { PlaceDto } from 'src/app/common/dtos/place.dto';
import { LoadPlaces } from 'src/app/store/actions/places.action';

@Component({
  selector: 'destinationv-route-list',
  templateUrl: 'route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
  currentPanelId: string;
  routeList$: Observable<RouteDto[]>;
  placesList$: Observable<PlaceDto[]>;

  constructor(
    private store: Store<RouteState>,
    private storeGlobal: Store<GlobalState>,) {
    store.dispatch(new LoadRoutes());

    this.routeList$ = store.select(getRoutes);
    this.placesList$ = storeGlobal.select(getPlaces).pipe(
      tap(places => {
        if (!places || places.length === 0) {
          storeGlobal.dispatch(new LoadPlaces());
        }
      })
    );
  }

  setExpandedPanelId(routeId: string) {
    this.currentPanelId = this.currentPanelId === routeId ? null : routeId;
  }

  ngOnInit() {}
}
