import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './model/user.model';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
      return this.userService.userConected.pipe(
        take(1),
        map((user: User) => {
          if (user) {
            return this.router.parseUrl('/');
          } else {
            return true;
          }
        })
      );
  }
}
