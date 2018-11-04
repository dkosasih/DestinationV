import { RouteDto } from '../../dtos/route.dto';
import { RouteActions, RouteTypes } from '../actions/routes.action';

const initialState: RouteDto[] = [];

export function routesReducerFn(state = initialState, action: RouteActions): RouteDto[] {
  switch (action.type) {
    case RouteTypes.LoadRoutesComplete:
      return [ ...action.payload ];
    default:
      return state;
  }
}
