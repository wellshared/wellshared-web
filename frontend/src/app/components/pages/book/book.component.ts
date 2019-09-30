import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CenterService } from 'src/app/services/center.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private CenterService: CenterService) { }

  ngOnInit() {
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

  submit() {
    if (this.formGroup.valid) {
      console.log( this.formGroup.value.center,
        this.formGroup.value.name,
        this.formGroup.value.email,
        this.formGroup.value.phone,
        this.formGroup.value.message);
      this.CenterService
      .alquila(
        this.formGroup.value.centro,
        this.formGroup.value.nombre,
        this.formGroup.value.correo,
        this.formGroup.value.telefono,
        this.formGroup.value.mensaje).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }

}
