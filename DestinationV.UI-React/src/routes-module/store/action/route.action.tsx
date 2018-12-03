import { RouteDto } from "../../dto/route.dto";
import { ActionCreator } from "redux";

export enum RouteTypes {
    LoadRoutes = '[Routes] Load',
    LoadRoutesComplete = '[Routes] Load Complete',
    DeleteRoute = '[Route] Delete',
    DeleteRouteComplete = '[Route] Delete Complete'
}

interface ActionTypes {
    type: RouteTypes;
}

interface ActionPayload<T> {
    payload: T;
}

export const loadRoutes: ActionCreator<ActionTypes> = () => ({
    type: RouteTypes.LoadRoutes
});

export const loadRoutesComplete: ActionCreator<ActionTypes & ActionPayload<RouteDto[]>> = routesDto => ({
    type: RouteTypes.LoadRoutesComplete,
    payload: routesDto
});

export class LoadRoutes {
    readonly type = RouteTypes.LoadRoutes
    action: ActionCreator<ActionTypes> = () => ({
        type: RouteTypes.LoadRoutes
    });
}

export class LoadRoutesComplete {
    readonly type = RouteTypes.LoadRoutesComplete;
    constructor(public payload: RouteDto[]) {}
    action: ActionCreator<ActionTypes & ActionPayload<RouteDto[]>> = () => ({
        type: RouteTypes.LoadRoutesComplete,
        payload: this.payload
    });
}

export type RouteActions = LoadRoutes | LoadRoutesComplete;
