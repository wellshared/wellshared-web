import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Constants } from '../utils/constants';
import sha256 from 'crypto-js/sha256';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userConected: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(environment.url + '/login', {}, {headers, params});
  }

  logout() {
    return this.http.get(environment.url + '/logout').pipe(
      tap(() => {
        this.userConected.next(undefined);
        sessionStorage.removeItem(Constants.STORAGE_USR);
        this.router.navigate(['/']);
      })
    );
  }

  getConnectedUser() {
    return this.http.get(environment.url + '/user/session').pipe(
      map((user: User) => {
        this.userConected.next(user);
        const hashDigest = sha256(user);
        sessionStorage.setItem(Constants.STORAGE_USR, hashDigest);
        return user;
      })
    );
  }

}
