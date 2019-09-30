import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(environment.url+'/login', {}, {headers, params});
  }

}
