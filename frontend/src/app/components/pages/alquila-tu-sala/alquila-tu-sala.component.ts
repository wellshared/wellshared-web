import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CentrosService } from 'src/app/services/centros.service';

@Component({
  selector: 'app-alquila-tu-sala',
  templateUrl: './alquila-tu-sala.component.html',
  styleUrls: ['./alquila-tu-sala.component.css']
})
export class AlquilaTuSalaComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.formGroup = new FormGroup({
      centro: new FormControl(undefined, Validators.required),
      nombre: new FormControl(undefined, Validators.required),
      correo: new FormControl(undefined, Validators.required),
      telefono: new FormControl(undefined, Validators.required),
      mensaje: new FormControl(undefined, Validators.required),
      cookies: new FormControl(false, Validators.required)
    });
  }

  submit() {
    if (this.formGroup.valid) {
      console.log( this.formGroup.value.centro,
        this.formGroup.value.nombre,
        this.formGroup.value.correo,
        this.formGroup.value.telefono,
        this.formGroup.value.mensaje);
      this.centrosService
      .alquila(
        this.formGroup.value.centro,
        this.formGroup.value.nombre,
        this.formGroup.value.correo,
        this.formGroup.value.telefono,
        this.formGroup.value.mensaje).subscribe(() => window.location.reload(), error => window.location.reload());
    }
  }

}
