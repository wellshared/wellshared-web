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
import Swal from 'sweetalert2';
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
  requestNumber = 0;
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
          this.userService.logout();
          this.router.navigate(['login']);
        } else if(error.status === 406) {
          Swal.fire('', error.error, 'warning');
        }
        return throwError(error);
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
