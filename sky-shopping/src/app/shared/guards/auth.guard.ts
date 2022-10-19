import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

// @Injectable()
// export class AuthGuardService implements CanActivate {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly router: Router
//   ) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     return this.authService.isAuthenticated.pipe(
//       take(1),
//       map((res) => {
//         console.log('AuthGuard', res);
//         if (res === null || res === false) {
//           return this.router.createUrlTree(['/login']);
//         }
//         return res;
//       })
//     );
//   }
// }

@Injectable()
export class AuthOnLoadGuardService implements CanLoad {
  isAuthenticated!: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.authService.isAuthenticated.pipe(
      take(1),
      map((res) => {
        console.log('AuthOnGuard', res);
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
