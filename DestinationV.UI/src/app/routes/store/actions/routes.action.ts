import { RouteDto } from '../../dtos/route.dto';

export enum RouteTypes {
  LoadRoutes = '[Routes] Load',
  LoadRoutesComplete = '[Routes] Load Complete'
}

export class LoadRoutes {
  readonly type = RouteTypes.LoadRoutes;
}

export class LoadRouteComplete {
  readonly type = RouteTypes.LoadRoutesComplete;
  constructor(public payload: RouteDto[]) {}
}

export type RouteActions = LoadRoutes | LoadRouteComplete;
