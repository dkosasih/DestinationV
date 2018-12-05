import { combineReducers } from 'redux';
import { routesReducerFn } from '../../routes-module/store/reducers/route.reducer';
import { RouteDto } from '../../routes-module/dto/route.dto';

export type RootState = {
    routes: RouteDto[]
};

const reducers = combineReducers({
    routes: routesReducerFn
});

export default reducers;
