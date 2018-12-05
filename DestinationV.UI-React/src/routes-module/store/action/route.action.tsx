import { RouteDto } from "../../dto/route.dto";
import { ActionCreator } from "redux";

interface ActionTypes<T> {
    type: RouteTypes;
    payload?: T;
}

export enum RouteTypes {
    LoadRoutes = '[Routes] Load routes',
    LoadRoutesCompleted = '[Routes] Load routes completed',
    LoadRoutesFailed = '[Routes] Load routes failed',
    DeleteRoute = '[Route] Delete route',
    DeleteRouteCompleted = '[Route] Delete route completed',
    DeleteRouteFailed = '[Route] Delete route failed',
}

interface LoadRoutes extends ActionTypes<null> { }
interface LoadRoutesCompleted extends ActionTypes<RouteDto[]> { }
interface LoadRoutesFailed extends ActionTypes<null> { }
interface DeleteRoute extends ActionTypes<string> { }
interface DeleteRouteCompleted extends ActionTypes<string> { }
interface DeleteRouteFailed extends ActionTypes<null> { }

export const loadRoutes: ActionCreator<LoadRoutes> = () => ({
    type: RouteTypes.LoadRoutes
});

export const loadRoutesComplete: ActionCreator<LoadRoutesCompleted> = routesDto => ({
    type: RouteTypes.LoadRoutesCompleted,
    payload: routesDto
});

export const loadRoutesFailed: ActionCreator<LoadRoutesFailed> = () => ({
    type: RouteTypes.LoadRoutesCompleted
});

export const deleteRoute: ActionCreator<DeleteRoute> = (routeId: string) => ({
    type: RouteTypes.DeleteRoute,
    payload: routeId
});

export const deleteRouteCompleted: ActionCreator<DeleteRouteCompleted> = (routeId: string) => ({
    type: RouteTypes.DeleteRouteCompleted,
    payload: routeId
});

export const deleteRouteFailed: ActionCreator<DeleteRouteFailed> = () => ({
    type: RouteTypes.DeleteRouteFailed
});

export type RouteActions = LoadRoutes | LoadRoutesCompleted | LoadRoutesFailed | DeleteRoute | DeleteRouteCompleted | DeleteRouteFailed;
