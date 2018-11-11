import { RouteDto } from '../../dtos/route.dto';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { routesReducerFn } from './routes.reducer';

export interface RouteState {
  routes: RouteDto[];
}

export const routesReducer: ActionReducerMap<RouteState> = {
  routes: routesReducerFn
};

// create feature selector
const getRoutesState = createFeatureSelector<RouteState>('routesReducer');

// allow root to select the residentdto: this would have to be added as the dto to get grows
export const getRoutes = createSelector(getRoutesState, (routeState: RouteState) => routeState.routes);
