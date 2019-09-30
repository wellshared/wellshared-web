import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
    });
  }

  login() {
    if(this.formGroup.valid) {
      this.userService.login(
        this.formGroup.controls['username'].value,
        this.formGroup.controls['password'].value
        ).subscribe(console.log);
    }
  }

}
