import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/services/centros.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      nombre: new FormControl(undefined, Validators.required),
      apellidos: new FormControl(undefined, Validators.required),
      correo: new FormControl(undefined, Validators.required),
      telefono: new FormControl(undefined, Validators.required),
      mensaje: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
    window.scrollTo(0, 0);
  }
  submit() {
    if (this.formGroup.valid) {
      this.centrosService
      .contacto(
        this.formGroup.value.nombre,
        this.formGroup.value.apellidos,
        this.formGroup.value.correo,
        this.formGroup.value.telefono,
        this.formGroup.value.mensaje).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }

}
