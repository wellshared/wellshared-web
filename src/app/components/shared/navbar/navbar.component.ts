import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userConected.subscribe((user: User) => {
      this.user = user;
    });
  }

  logout() {
    this.userService.logout().subscribe();
  }

}
