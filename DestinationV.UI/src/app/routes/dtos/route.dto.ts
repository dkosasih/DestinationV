import { PlaceDto } from './place.dto';

export class RouteDto {
  id: string;
  origin: PlaceDto;
  destination: PlaceDto;
  departUtc: Date;
}
