import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProductsComponent } from '../products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [UserComponent, ProductsComponent, CartComponent],
  imports: [UserRoutingModule, SharedModule, ProductModule, CartModule],
})
export class UserModule {}
