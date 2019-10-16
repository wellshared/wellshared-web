import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  Book
} from 'src/app/model/book.model';
import {
  BookService
} from 'src/app/services/book.service';
import {
  Constants
} from 'src/app/utils/constants';
import {
  DatePipe
} from '@angular/common';
import {
  Center
} from 'src/app/model/center.model';
import {
  CenterService
} from 'src/app/services/center.service';
import { BookStatus } from 'src/app/model/book-status.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  book: Book;
  horas: string[] = Constants.hours;
  centers: Center[] = [];
  status: BookStatus[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private centerService: CenterService,
    private datePipe: DatePipe,
    private router: Router) {
    this.createEmptyForGroup();
  }

  ngOnInit() {
    this.findCenters();
    this.findBookStatus();
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.findBook(Number(params.id));
      }
    });
  }

  findCenters() {
    this.centerService.find(undefined).subscribe((centers: Center[]) => {
      this.centers = centers;
    });
  }

  findBook(id: number) {
    this.bookService.findById(id).subscribe((book: Book) => {
      this.book = book;
      this.updateFormGroup();
    });
  }

  findBookStatus() {
    this.bookService.findBookStatus().subscribe((status: BookStatus[]) => {
      this.status = status;
    });
  }

  createEmptyForGroup() {
    this.formGroup = new FormGroup({
      center: new FormControl(null, Validators.required),
      adress: new FormControl(null, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      timeTo: new FormControl(null, Validators.required),
      timeFrom: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }

  updateFormGroup() {
    const from: any = this.book.date.split('-');
    const date = new Date(from[2], from[1] - 1, from[0]);
    this.formGroup = new FormGroup({
      center: new FormControl(this.book.center.id, Validators.required),
      adress: new FormControl(this.book.email, Validators.required),
      date: new FormControl(date, Validators.required),
      timeTo: new FormControl(this.book.timeTo, Validators.required),
      timeFrom: new FormControl(this.book.timeFrom, Validators.required),
      status: new FormControl(this.book.bookStatus.id, Validators.required),
    });
  }

  submit() {
    if (this.formGroup.valid) {
      const book = new Book(
        (this.book) ? this.book.id : undefined,
        this.centers.find(center => center.id === Number(this.formGroup.value.center)),
        this.formGroup.value.adress,
        this.datePipe.transform(this.formGroup.value.date, 'dd-MM-yyyy'),
        this.formGroup.value.timeTo,
        this.formGroup.value.timeFrom,
        this.status.find(state => state.id === Number(this.formGroup.value.status))
      );
      this.bookService.saveBook(book).subscribe(() => {
        this.router.navigate(['/admin/books']);
      });
    }
  }
}
