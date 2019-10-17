import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactDto } from '../model/dto/contact-dto.model';
import { RentDto } from '../model/dto/rent-dto.model';
import { BookDto } from '../model/dto/book-dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  contact(contactData: ContactDto) {
    return this.http.post(this.url + '/api/mailer/contact', contactData, {responseType: 'text'});
  }

  rent(rentData: RentDto) {
    return this.http.post(this.url + '/api/mailer/rent', rentData, {responseType: 'text'});
  }

  book(bookData: BookDto) {
    return this.http.post(this.url + '/api/mailer/booking', bookData, {responseType: 'text'});
  }
}
