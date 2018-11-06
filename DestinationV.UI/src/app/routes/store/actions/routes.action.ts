import { RouteDto } from '../../dtos/route.dto';
import { ActionResult } from 'src/app/common/dtos/action-result.dto';

export enum RouteTypes {
  LoadRoutes = '[Routes] Load',
  LoadRoutesComplete = '[Routes] Load Complete',
  DeleteRoute = '[Route] Delete',
  DeleteRouteComplete = '[Route] Delete Complete'
}

export class LoadRoutes {
  readonly type = RouteTypes.LoadRoutes;
}

export class LoadRouteComplete {
  readonly type = RouteTypes.LoadRoutesComplete;
  constructor(public payload: RouteDto[]) {}
}

export class DeleteRoute {
  readonly type = RouteTypes.DeleteRoute;
  constructor(public id: string) { }
}

export class DeleteRouteComplete {
  readonly type = RouteTypes.DeleteRouteComplete;
  constructor(public payload: ActionResult<string>) { }
}

export type RouteActions = LoadRoutes | LoadRouteComplete |
  DeleteRoute | DeleteRouteComplete;
