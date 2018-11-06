import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../../common/services/base.data.service';
import { RouteDto } from '../dtos/route.dto';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteDataService extends BaseDataService {
  private readonly baseRouteUrl = 'api/route';

  constructor(baseHttp: HttpClient, injector: Injector) {
    super(baseHttp, injector);
  }

  getRoutes() {
    return this.baseHttpGet<string, RouteDto[]>(`${this.baseRouteUrl}`);
  }

  deleteRoute(id: string) {
    return this.baseHttpDelete(`${this.baseRouteUrl}/${id}`);
  }
}
