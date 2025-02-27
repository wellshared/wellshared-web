import {
  Component,
  OnInit
} from '@angular/core';
import {
  Center
} from '../../../model/center.model';
import {
  ActivatedRoute
} from '@angular/router';
import {
  CenterService
} from '../../../services/center.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  BookDto
} from '../../../model/dto/book-dto.model';
import {
  MailerService
} from '../../../services/mailer.service';
import {
  DatePipe
} from '@angular/common';
import {
  Constants
} from '../../../utils/constants';
import {
  BookService
} from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';
import { HTTPStatus } from 'src/app/services/HTTPListener.interceptor';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {
  center: Center;
  responseMsg: string;
  formGroup: FormGroup;
  horas: string[] = Constants.hours;
  years: number[] = Constants.years;
  months: number[] = Constants.months;
  apiCaptcha = environment.recaptcha;
  recaptchaToken: string;
  constructor(private route: ActivatedRoute, private centerService: CenterService,
              private bookService: BookService, private datePipe: DatePipe, private httpStatus: HTTPStatus) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initFormGroup();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.centerService.findById(params.id).subscribe((center: Center) => {
          this.center = center;
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
      cardUser: new FormControl(undefined, Validators.required),
      cardNumber: new FormControl('', Validators.required),
      expiryDate: new FormControl('', Validators.required),
      cvv: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
  }
  resolved(captchaResponse: string) {
    this.recaptchaToken = captchaResponse;
}
  getPrice() {
    let num = 0;
    if (this.formGroup.value.timeTo && this.formGroup.value.timeFrom) {
      const to = this.formGroup.value.timeTo.split(':')[0];
      const from = this.formGroup.value.timeFrom.split(':')[0];
      const dif = to - from;
      num = dif * Number(this.center.price);
    }
    return num;
  }

  submit() {
    if (this.formGroup.valid) {
      const card = this.formGroup.value.cardNumber.replace(/\s/g, '');
      this.httpStatus.setPaymentProcess(true);
      (window as any).Stripe.card.createToken({
        number: card,
        exp_month: this.formGroup.value.expiryDate.split('/')[0],
        exp_year: '20' + this.formGroup.value.expiryDate.split('/')[1],
        cvc: this.formGroup.value.cvv
      }, (status: number, response: any) => {
        if (status === 200) {
          console.log(response.id);
          this.prepareDateToSend(response.id);
        } else {
          this.httpStatus.setPaymentProcess(false);
          this.responseMsg = 'La tarjeta introducida no es válida';
        }
      });
    }
  }

  prepareDateToSend(token: string) {
    const bookDto = new BookDto(
      this.center.id,
      this.formGroup.value.name,
      this.formGroup.value.sname,
      this.formGroup.value.email,
      this.formGroup.value.phone,
      this.formGroup.value.number,
      this.formGroup.value.date,
      this.formGroup.value.timeFrom,
      this.formGroup.value.timeTo,
      this.center.name,
      this.getPrice(),
      'EUR',
      token
    );
    this.bookService.send(bookDto).subscribe((response: string) => {
      this.httpStatus.setPaymentProcess(false);
      this.responseMsg = response;
      window.location.reload();
    }, error => {
      this.httpStatus.setPaymentProcess(false);
      this.responseMsg = 'Ha habido un error en el servicio';
      this.initFormGroup();
    });
  }
}
