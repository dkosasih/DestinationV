import { RouteDto } from '../../dtos/route.dto';
import { RouteActions, RouteTypes } from '../actions/routes.action';

const initialState: RouteDto[] = [];

export function routesReducerFn(state = initialState, action: RouteActions): RouteDto[] {
  switch (action.type) {
    case RouteTypes.LoadRoutesComplete:
      return [...action.payload];
    case RouteTypes.DeleteRouteComplete:
      if (action.payload.isSuccess) {
        return state.filter(x => x.id !== action.payload.payload);
      }
      return state;
    case RouteTypes.UpdateComplete:
      if (action.payload.isSuccess) {
        const withoutEdited = state.filter(x => x.id !== action.payload.payload.id);
        return [...withoutEdited, action.payload.payload]
      }
      return state;
    default:
      return state;
  }
}
