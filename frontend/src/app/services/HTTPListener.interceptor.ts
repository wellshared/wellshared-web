import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
export class HTTPListener implements HttpInterceptor {
  constructor(private status: HTTPStatus) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        this.status.setHttpStatus(true);
        return event;
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
