import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouter } from './app-routing.module';
import { DirectiveModule } from './shared/directives/directive.module';
import { UserService } from './shared/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptorService } from './shared/interceptors/token.interceptor';
import { ProductService } from './products/products.service';
import { AuthOnLoadGuardService } from './shared/guards/auth-onload.guard';
import { AuthGuardService } from './shared/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleGuardService } from './shared/guards/role.guard';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './loader/loader.reducer';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    AppRouter,
    BrowserModule,
    BrowserAnimationsModule,
    DirectiveModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ loader: reducer }),
  ],
  providers: [
    UserService,
    AuthService,
    ProductService,
    AuthGuardService,
    AuthOnLoadGuardService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
