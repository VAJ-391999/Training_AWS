import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouter } from './app-routing.module';
import { DirectiveModule } from './shared/directives/directive.module';
import { UserService } from './shared/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { TokenInterceptorService } from './shared/interceptors/token.interceptor';
import { ProductService } from './products/products.service';

@NgModule({
  declarations: [AppComponent, AdminComponent],
  imports: [
    AppRouter,
    BrowserModule,
    BrowserAnimationsModule,
    DirectiveModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    AuthService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
