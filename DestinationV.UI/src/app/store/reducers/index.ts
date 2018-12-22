import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { PlaceDto } from 'src/app/common/dtos/place.dto';
import { placesReducerFn } from './places.reducer';

// global state management
export interface GlobalState {
  places: PlaceDto[];
}

export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [storeFreeze] : [];

export const globalReducers: ActionReducerMap<GlobalState> = {
  places: placesReducerFn
};

// create global state selector
const getPlacesState = createFeatureSelector<GlobalState>('globalReducer');

// allow root to select the dto: this would have to be added as the dto to get grows
export const getPlaces = createSelector(getPlacesState, (globalState: GlobalState) => globalState.places);
