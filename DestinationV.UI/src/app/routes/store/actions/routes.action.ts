import { RouteDto } from '../../dtos/route.dto';
import { ActionResult } from 'src/app/common/dtos/action-result.dto';

export enum RouteTypes {
  LoadRoutes = '[Routes] Load',
  LoadRoutesComplete = '[Routes] Load Complete',
  DeleteRoute = '[Route] Delete',
  DeleteRouteComplete = '[Route] Delete Complete',
  UpdateRoute = '[Route] Update',
  UpdateComplete = '[Route] Update Complete',
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

export class UpdateRoute {
  readonly type = RouteTypes.UpdateRoute;
  constructor(public payload: RouteDto) { }
}

export class UpdateRouteComplete {
  readonly type = RouteTypes.UpdateComplete;
  constructor(public payload: ActionResult<RouteDto>) { }
}

export type RouteActions = LoadRoutes | LoadRouteComplete |
  DeleteRoute | DeleteRouteComplete |
  UpdateRoute | UpdateRouteComplete;
