import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

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
  constructor(private status: HTTPStatus, private router: Router, private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req).pipe(
      map(event => {
        this.status.setHttpStatus(true);
        return event;
      }), catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
          this.userService.userConected.next(undefined);
        }
        return throwError(error);
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
