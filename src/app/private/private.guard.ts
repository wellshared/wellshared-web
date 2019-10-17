import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable()
export class PrivateGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
      return this.userService.userConected.pipe(
        take(1),
        map((user: User) => {
          if (user) {
            return true;
          } else {
            return this.router.parseUrl('/login');
          }
        })
      );
  }
}
