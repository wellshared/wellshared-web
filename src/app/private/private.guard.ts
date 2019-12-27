import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Constants } from '../utils/constants';

@Injectable()
export class PrivateGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
      if (sessionStorage.getItem(Constants.STORAGE_USR)) {
        return true;
      } else {
        return this.router.parseUrl('/');
      }
  }
}
