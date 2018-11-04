import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getRoutes } from '../store/reducers';
import { RouteDto } from '../dtos/route.dto';
import { Observable } from 'rxjs';
import { LoadRoutes } from '../store/actions/routes.action';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'destinationv-route-list',
  templateUrl: 'route-list.component.html'
})

export class RouteListComponent implements OnInit {
  routeList$: Observable<RouteDto[]>;

  constructor(private store: Store<State>) {
    store.dispatch(new LoadRoutes());

    this.routeList$ = store.select(getRoutes).pipe(
      tap(bla => console.log('bla', bla))
    );
  }

  ngOnInit() { }
}
