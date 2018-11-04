import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, Optional } from '@angular/core';
import { API_HOST } from 'src/app/configs/api-host.config';

export abstract class BaseDataService {
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private host: string;

  constructor(private baseHttp: HttpClient,
    apiHost: string
  ) {
    this.host = apiHost;
  }

  protected handleError<T>(_result?: T) {
    return (error: any): Observable<T> => {
      let errMsg: string;
      if (error instanceof HttpErrorResponse) {
        if (error.error != null) {
          errMsg = `Server responded with error: ${error.error.message}`;
        } else {
          errMsg = 'A general error occurred while processing your request. Please try again later.';
        }
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      return Observable.throw({ message: errMsg });
    };
  }

  protected baseHttpGet<T, U>(url: string, data?: T): Observable<U> {
    const params = this.appendParams(new HttpParams(), data);
    return this.baseHttp.get<U>(
      `${this.host}${url}`,
      { headers: this.headers, params: params }
    ).pipe(
      catchError(this.handleError<U>())
    );
  }

  protected baseHttpPost<T, U>(url: string, data: T): Observable<U> {
    return this.baseHttp.post<U>(
      `${this.host}${url}`, data, { headers: this.headers }
    ).pipe(
      catchError(this.handleError<U>())
    );
  }

  protected appendParams(params: HttpParams, obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return params;
  }
}
