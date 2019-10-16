import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userConected: Subject<User> = new Subject<User>();
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(environment.url + '/login', {}, {headers, params});
  }

  getConnectedUser() {
    return this.http.get(environment.url + '/user/session');
  }

}
