import { PlaceDto } from './place.dto';

export interface RouteDto {
  id: string;
  origin: PlaceDto;
  destination: PlaceDto;
  departUtc: Date;
}
