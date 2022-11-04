import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { LoaderAction } from 'src/app/loader/loader.reducer';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private readonly store: Store<any>
  ) {}
  token: string | null = null;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch({ type: LoaderAction.START });
    this.token = this.authService.getToken();
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.status === 401) {
          console.log('Status code 401');
          this.authService.userLogout();
        }
        let errorMessage;

        if (!(err.error instanceof ErrorEvent)) {
          errorMessage = `Error: ${err.error.message}`;
        } else {
          errorMessage = `Error Code: ${err.status}\nMessage: ${
            err.statusText || err.message
          }`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.store.dispatch({ type: LoaderAction.STOP });
      })
    );
  }
}
