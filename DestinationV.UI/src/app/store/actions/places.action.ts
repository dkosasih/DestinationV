import { PlaceDto } from 'src/app/common/dtos/place.dto';

export enum PlaceTypes {
  loadPlaces = '[Places] Load',
  loadPlacesComplete = '[Places] Load Complete'
}

export class LoadPlaces {
  readonly type = PlaceTypes.loadPlaces;
}

export class LoadPlacesComplete {
  readonly type = PlaceTypes.loadPlacesComplete;
  constructor(public payload: PlaceDto[]) {}
}


export type PlacesActions = LoadPlaces | LoadPlacesComplete;
