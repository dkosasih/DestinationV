import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getRoutes, RouteState } from '../store/reducers';
import { RouteDto } from '../dtos/route.dto';
import { Observable } from 'rxjs';
import { LoadRoutes, DeleteRoute, UpdateRoute } from '../store/actions/routes.action';
import { take, tap } from 'rxjs/operators';
import { GlobalState, getPlaces } from 'src/app/store/reducers';
import { PlaceDto } from 'src/app/common/dtos/place.dto';
import { LoadPlaces } from 'src/app/store/actions/places.action';
import { RouteDetailsAnswer } from './route-details/route-details.component';
import { OperationType } from 'src/app/common/constants/operation-type.constant';

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
    private store: Store<RouteState & GlobalState>
  ) {
    store.dispatch(new LoadRoutes());

    this.routeList$ = store.pipe(select(getRoutes));
    this.placesList$ = store.pipe(select(getPlaces),
      tap(places => {
      if (!places || places.length === 0) {
        this.store.dispatch(new LoadPlaces());
      }
    }));
  }

  actionOnResult(event: RouteDetailsAnswer) {
    if (event.buttonType === OperationType.DELETE) {
      this.store.dispatch(new DeleteRoute(event.data.id));
    } else if (event.buttonType === OperationType.UPDATE){
      this.store.dispatch(new UpdateRoute(event.data));
    }
    this.currentPanelId = null;
  }

  setExpandedPanelId(routeId: string) {
    this.currentPanelId = this.currentPanelId === routeId ? null : routeId;
  }

  ngOnInit() {}
}
