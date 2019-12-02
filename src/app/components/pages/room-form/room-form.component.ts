import { Component, OnInit } from '@angular/core';
import { Center } from '../../../model/center.model';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from '../../../services/center.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookDto } from '../../../model/dto/book-dto.model';
import { MailerService } from '../../../services/mailer.service';
import { DatePipe } from '@angular/common';
import { Constants } from '../../../utils/constants';

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
  constructor(private route: ActivatedRoute, private centerService: CenterService,
    private mailerService: MailerService, private datePipe: DatePipe) { }

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

  pay() {    
    let amount = 20;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'ES',
      token: function (token: any) {
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Datos de pago de reserva',
      description: '',
      amount: amount * 100
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
          this.pay();
          this.initFormGroup();
      });
    }
  }
}
