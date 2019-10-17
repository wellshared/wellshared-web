import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.url + '/api/service/')
  }
}
