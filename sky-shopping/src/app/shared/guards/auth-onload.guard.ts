import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
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
    this.authService.isAuthenticated.pipe(
      take(1),
      map((res) => {
        console.log('AuthGuard', res);
        if (res) {
          this.isAuthenticated = res;
        }
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      })
    );
    return this.isAuthenticated;
  }
}

// @Injectable()
// export class AuthGuardService implements CanLoad {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly router: Router
//   ) {}
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     // return this.authService.isAuthenticated.pipe(
//     //   take(1),
//     //   map((res) => {
//     //     console.log('AuthGuard', res);
//     //     if (res === null || res === false) {
//     //       return this.router.createUrlTree(['/login']);
//     //     }
//     //     return res;
//     //   })
//     // );
//     return true;
//   }
// }
