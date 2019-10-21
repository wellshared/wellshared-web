import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.url + '/api/book/');
  }

  findByCenter(id: number) {
    return this.http.get(this.url + '/api/book/center/' + id);
  }

  findById(id: number) {
    return this.http.get(this.url + '/api/book/' + id);
  }

  saveBook(book: Book) {
    return this.http.post(this.url + '/api/book/', book, {responseType: 'text'});
  }

  findBookStatus() {
    return this.http.get(this.url + '/api/book/status');
  }

  deleteBook(id: number) {
    return this.http.delete(this.url + '/api/book/' + id, {responseType: 'text'});
  }
}
