import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { CenterService } from 'src/app/services/center.service';
import { RoomTimeIntervalHeader } from 'src/app/model/room-time-interval-header.model';
import { Center } from 'src/app/model/center.model';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/services/book.service';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewChecked {
  intervals: RoomTimeIntervalHeader[] = [];
  @Input() height;
  @ViewChild('calendar', {
    static: false
  }) calendarComponent: FullCalendarComponent;
  header = {};
  
  calendarPlugins = [timeGridPlugin];
  buttonText = {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana'
  };
  calendarApi: any;
  @Input() center: Center;
  books: Book[] = [];
  constructor(private centerService: CenterService, private bookService: BookService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getCalendarEvents();
  }
  ngAfterViewChecked(): void {
    if (this.calendarComponent) {
      this.calendarComponent.getApi().setOption('eventOverlap', (stillEvent, movingEvent) => {
        console.log('entra');
        return stillEvent.rendering === 'background';
      });
    }
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
                start: `${day}T${detail.timeFrom}:00`,
                rendering: 'background',
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
          if (this.calendarComponent) {
            const day = this.datePipe.transform(book.date, 'yyyy-MM-dd');
            this.calendarComponent.getApi().addEvent({
              overlap: true,
              color: 'red',
              title: 'Ocupado',
              start: `${day}T${book.timeFrom}:00`,
              end: `${day}T${book.timeTo}:00`,
              allDay: false,
            });
          }
        });
      });
    });
  }

  overlap
}
