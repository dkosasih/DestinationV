import { PlacesActions, PlaceTypes } from '../actions/places.action';
import { PlaceDto } from 'src/app/common/dtos/place.dto';

const initialState: PlaceDto[] = [];

export function placesReducerFn(state = initialState, action: PlacesActions): PlaceDto[] {
  switch (action.type) {
    case PlaceTypes.loadPlacesComplete:
      return [...action.payload];
    default:
      return state;
  }
}
