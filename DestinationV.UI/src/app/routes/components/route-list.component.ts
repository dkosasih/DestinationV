import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRoutes, RouteState } from '../store/reducers';
import { RouteDto } from '../dtos/route.dto';
import { Observable } from 'rxjs';
import { LoadRoutes, DeleteRoute } from '../store/actions/routes.action';
import { take } from 'rxjs/operators';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { RouteDetailsComponent, RouteDetailsAnswer } from './route-details/route-details.component';

@Component({
  selector: 'destinationv-route-list',
  templateUrl: 'route-list.component.html'
})
export class RouteListComponent implements OnInit {
  private modalOptions: ModalOptions = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  routeList$: Observable<RouteDto[]>;

  constructor(private store: Store<RouteState>, private modalService: BsModalService) {
    store.dispatch(new LoadRoutes());

    this.routeList$ = store.select(getRoutes);
  }

  showDetails(route: RouteDto) {
    this.modalOptions.initialState = {
      dto: route
    };

    this.modalService
      .show(RouteDetailsComponent, this.modalOptions)
      .content.result.pipe(take(1))
      .subscribe((x: RouteDetailsAnswer) => {
        if (x.buttonType === 'delete') {
          this.store.dispatch(new DeleteRoute(route.id));
        }
      });
  }

  ngOnInit() {}
}
