import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('token')) {
      const token: string = sessionStorage.getItem('token');

      let auth = 'Bearer ' + token;
      request = request.clone({
        setHeaders: {
          Authorization: auth
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error--->>>', error);
        let data = {};
        data = {
          reason: error && error.error?.message ? error.error?.message
            : error.error?.message ? error.error?.Message
              : error.statusText ? error.statusText : '',
          status: error.error?.code ? error.error?.code : error.status ? error.status : ''
        };
        return throwError(error);
      }));
  }
}
