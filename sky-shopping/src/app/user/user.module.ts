import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProductsComponent } from '../products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { CheckoutModule } from '../checkout/chekout.module';

@NgModule({
  declarations: [UserComponent, ProductsComponent],
  imports: [
    UserRoutingModule,
    SharedModule,
    ProductModule,
    CartModule,
    CheckoutModule,
  ],
})
export class UserModule {}
