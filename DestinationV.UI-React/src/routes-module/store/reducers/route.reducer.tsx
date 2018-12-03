import { RouteDto } from "../../dto/route.dto";
import { RouteTypes, RouteActions } from "../action/route.action";

const initialState: RouteDto[] = [];

export function routesReducerFn(state = initialState, action: RouteActions): RouteDto[] {
  switch (action.type) {
    case RouteTypes.LoadRoutesComplete:
      return [...action.payload];
    // case RouteTypes.DeleteRouteComplete:
    //   if (action.payload.isSuccess) {
    //     return state.filter(x => x.id !== action.payload.payload);
    //   }
    //     return state;
    default:
      return state;
  }
}
