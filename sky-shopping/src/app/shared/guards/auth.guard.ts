import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  isAuthenticated!: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.isLoggedIn()) {
      console.log('Auth guard', this.authService.isLoggedIn());
      this.authService.isAuthenticated.next(true);
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
