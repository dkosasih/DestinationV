import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../../common/services/base.data.service';
import { RouteDto } from '../dtos/route.dto';
import { Injectable, Inject } from '@angular/core';
import { API_HOST } from 'src/app/configs/api-host.config';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService extends BaseDataService {
  private readonly baseRouteUrl = 'api/route';

  constructor(baseHttp: HttpClient, @Inject(API_HOST) apiHost: string) {
    super(baseHttp, apiHost);
  }

  getRoutes() {
    return this.baseHttpGet<string, RouteDto[]>(`${this.baseRouteUrl}`);
  }
}
