import { PlaceDto } from '../../common/dtos/place.dto';

export interface RouteDto {
  id: string;
  origin: PlaceDto;
  destination: PlaceDto;
  departUtc: Date;
}
