import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private CenterService: CenterService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(undefined, Validators.required),
      sname: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, Validators.required),
      phone: new FormControl(undefined, Validators.required),
      message: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
    window.scrollTo(0, 0);
  }
  submit() {
    if (this.formGroup.valid) {
      this.CenterService
      .contacto(
        this.formGroup.value.name,
        this.formGroup.value.sname,
        this.formGroup.value.email,
        this.formGroup.value.phone,
        this.formGroup.value.message).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }

}
