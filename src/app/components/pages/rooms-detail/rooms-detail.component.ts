import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CenterService
} from 'src/app/services/center.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as moment from 'moment';
import {
  FullCalendarComponent
} from '@fullcalendar/angular';
import {
  Marker
} from 'src/app/model/marker.model';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Center
} from 'src/app/model/center.model';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Constants
} from 'src/app/utils/constants';
import {
  BookDto
} from 'src/app/model/dto/book-dto.model';
import {
  MailerService
} from 'src/app/services/mailer.service';
import {
  DatePipe
} from '@angular/common';
import {
  Image
} from 'src/app/model/image.model';
import {
  BookService
} from '../../../services/book.service';
import {
  Book
} from '../../../model/book.model';
import { ImageConverter } from 'src/app/services/image-converter.service';
@Component({
  selector: 'app-rooms-detail',
  templateUrl: './rooms-detail.component.html',
  styleUrls: ['./rooms-detail.component.css']
})
export class RoomsDetailComponent implements OnInit {
  lat = 41.406413;
  lng = 2.162171;
  markers: Marker[] = [];
  calendarPlugins = [timeGridPlugin];
  customButtons: any;
  @ViewChild('calendar', {
    static: false
  }) calendarComponent: FullCalendarComponent;
  header = {};
  buttonText = {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana'
  };
  calendarApi: any;
  center: Center;
  selectedImage: Image;
  formGroup: FormGroup;
  horas: string[] = Constants.hours;
  books: Book[] = [];
  responseMsg: string;
  constructor(
    private centerService: CenterService, private mailerService: MailerService,
    private route: ActivatedRoute, private datePipe: DatePipe, private bookService: BookService,
    private imageConverter: ImageConverter) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initFormGroup();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.centerService.findById(params.id).subscribe((center: Center) => {
          this.center = center;
          this.selectedImage = center.images[0];
          this.lat = Number(this.center.lat);
          this.lng = Number(this.center.lon);
          this.markers[0] = new Marker(
            this.center.lat, this.center.lon, false, this.center.name,
            this.center.adress, this.center.price, this.center.images[0], this.center.id);
          this.getCalendarEvents();
        });
      }
    });
  }

  initFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      sname: new FormControl(undefined, Validators.required),
      number: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      timeFrom: new FormControl(undefined, Validators.required),
      timeTo: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
  }
  submit() {
    if (this.formGroup.valid) {
      const bookDto = new BookDto(
        this.center.id,
        this.formGroup.value.name,
        this.formGroup.value.sname,
        this.formGroup.value.email,
        this.formGroup.value.phone,
        this.formGroup.value.number,
        this.datePipe.transform(this.formGroup.value.date, 'dd-MM-yyyy'),
        this.formGroup.value.timeFrom,
        this.formGroup.value.timeTo
      );
      this.mailerService.book(bookDto).subscribe((response: string) => {
          this.responseMsg = response;
          this.initFormGroup();
      });
    }
  }
  selectImage(image: Image) {
    this.selectedImage = image;
  }
  getCalendarEvents() {
    this.bookService.findByCenter(this.center.id).subscribe((books: Book[]) => {
      this.books = books;
      this.books.forEach((book: Book) => {
        if (this.calendarComponent) {
          const from: any = book.date.split('-');
          this.calendarComponent.getApi().addEvent({
            title: (book.bookStatus.id === 1 || book.bookStatus.id === 2) ? 'Reservado' : 'Libre',
            start: from[2] + '-' + from[1] + '-' + from[0] + 'T' + book.timeFrom + ':00',
            end: from[2] + '-' + from[1] + '-' + from[0] + 'T' + book.timeTo + ':00',
            allDay: false,
            color: (book.bookStatus.id === 1 || book.bookStatus.id === 2) ? '#e61e1e' : '#97d027'
          });
        }
      });
    });
  }

}
