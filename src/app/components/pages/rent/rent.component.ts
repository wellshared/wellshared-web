import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MailerService } from 'src/app/services/mailer.service';
import { RentDto } from 'src/app/model/dto/rent-dto.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  formGroup: FormGroup;
  apiCaptcha = environment.recaptcha;
  recaptchaToken: string;
  constructor(private mailerService: MailerService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    this.formGroup = new FormGroup({
      center: new FormControl(undefined, Validators.required),
      name: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
      message: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
  }

  resolved(captchaResponse: string) {
    this.recaptchaToken = captchaResponse;
  }

  submit() {
    if (this.formGroup.valid) {
      const rentDto = new RentDto(this.formGroup.value.center,
        this.formGroup.value.name,
        this.formGroup.value.email,
        this.formGroup.value.phone,
        this.formGroup.value.message
      );
      this.mailerService.rent(rentDto).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }

}
