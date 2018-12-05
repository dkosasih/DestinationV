import { RouteDto } from '../../dto/route.dto';
import { RouteTypes, RouteActions } from '../action/route.action';

const initialState: RouteDto[] = [];

export function routesReducerFn(state = initialState, action: RouteActions): RouteDto[] {
    switch (action.type) {
        case RouteTypes.LoadRoutesCompleted:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;
        case RouteTypes.DeleteRouteCompleted:
            return state.filter(x => x.id !== action.payload);
        default:
            return state;
    }
}
