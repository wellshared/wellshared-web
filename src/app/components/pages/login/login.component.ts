import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.formGroup = new FormGroup({
      username: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.userService.login(
        this.formGroup.controls.username.value,
        this.formGroup.controls.password.value
        ).subscribe(() => {
          this.getUserConnected();
        });
    }
  }

  getUserConnected() {
    this.userService.getConnectedUser().subscribe((user: User) => {
      this.router.navigate(['/']);
    });
  }

}
