import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { API_HOST } from 'src/app/configs/api-host.config';

export class BaseDataService {
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private host: string;

  constructor(private baseHttp: HttpClient,
    injector: Injector
  ) {
    const apiHost = injector.get(API_HOST);
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
      return throwError({ message: errMsg });
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

  protected baseHttpDelete<T>(url: string) {
    return this.baseHttp.delete(
      `${this.host}${url}`, { headers: this.headers }
    ).pipe(
      catchError(this.handleError())
    );
  }

  protected baseHttpPut<T, U>(url: string, data: T): Observable<U> {
    return this.baseHttp.put<U>(
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
