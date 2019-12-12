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
import {
  ImageConverter
} from 'src/app/services/image-converter.service';
import {
  RoomTimeIntervalHeader
} from 'src/app/model/room-time-interval-header.model';
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
  intervals: RoomTimeIntervalHeader[] = [];
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
    this.route.params.subscribe(params => {
      if (params.id) {
        this.centerService.findById(params.id).subscribe((center: Center) => {
          this.center = center;
          this.selectedImage = center.images[0];
          this.lat = Number(this.center.lat);
          this.lng = Number(this.center.lon);
          this.markers[0] = new Marker(
            this.center.lat, this.center.lon, false, this.center.name,
            this.center.adress, this.center.price, this.center.mainImage, this.center.id);
          this.getCalendarEvents();
        });
      }
    });
  }
  selectImage(image: Image) {
    this.selectedImage = image;
  }
  getCalendarEvents() {
    this.centerService.findTimeIntervals(this.center.id).subscribe((headers: RoomTimeIntervalHeader[]) => {
      this.intervals = headers;
      headers.forEach(header => {
        header.roomTimeIntervalDetails.forEach(detail => {
          let diff = new Date(header.dayTo).valueOf() - new Date(header.dayFrom).valueOf();
          diff = Math.ceil(diff / (1000 * 3600 * 24));
          for (let index = 0; index < diff; index++) {
            if (this.calendarComponent) {

              const date = new Date(header.dayFrom);
              date.setDate(date.getDate() + index);
              const day = this.datePipe.transform(date, 'yyyy-MM-dd');
              this.calendarComponent.getApi().addEvent({
                title: 'Libre',
                start: `${day}T${detail.timeFrom}:00`,
                end: `${day}T${detail.timeTo}:00`,
                allDay: false,
              });
            }
          }
        });
      });
      this.bookService.findByCenter(this.center.id).subscribe((books: Book[]) => {
        this.books = books;
        this.books.forEach((book: Book) => {
          
        });
      });
    });

  }

}