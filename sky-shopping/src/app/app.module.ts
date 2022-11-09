import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
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
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { CartService } from './cart/cart.service';
import { CheckoutService } from './checkout/checkout.service';
import { NgxStripeModule } from 'ngx-stripe';
import { OrderService } from './order/order.service';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import {
  authReducer,
  AUTH_INIT_STATE,
  IAuthState,
} from './shared/redux/auth.store';
import { ManageLocationService } from './admin/manage-location/manage-location.service';
import { ExponentialStrengthPipe } from './shared/pipes/exponential-strength.pipe';
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DirectiveModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ loader: reducer }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxStripeModule.forRoot(
      'pk_test_51LzCIiSB37q7uKsrbbgSroYRyjLgj6QoKjozfcGrgMjsl7B7NBi8kxKYHlcI2ybV0BIy7YAAQDpzW8WUozUGk41I00SRCOaD5h'
    ),
    NgReduxModule,
  ],
  providers: [
    UserService,
    AuthService,
    ProductService,
    AuthGuardService,
    AuthOnLoadGuardService,
    RoleGuardService,
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    CartService,
    CheckoutService,
    OrderService,
    ManageLocationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAuthState>) {
    ngRedux.configureStore(authReducer, AUTH_INIT_STATE);
  }
}
