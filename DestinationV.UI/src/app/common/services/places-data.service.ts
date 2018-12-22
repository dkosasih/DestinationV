import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../../common/services/base.data.service';
import { Injectable, Injector } from '@angular/core';
import { PlaceDto } from '../dtos/place.dto';

@Injectable({
  providedIn: 'root'
})
export class PlaceDataService extends BaseDataService {
  private readonly baseRouteUrl = 'api/place';

  constructor(baseHttp: HttpClient, injector: Injector) {
    super(baseHttp, injector);
  }

  getPlaces() {
    return this.baseHttpGet<string, PlaceDto[]>(`${this.baseRouteUrl}`);
  }
}
