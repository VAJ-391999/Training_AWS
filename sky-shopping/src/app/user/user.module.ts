import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProductsComponent } from '../products/products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/products.module';

@NgModule({
  declarations: [UserComponent, ProductsComponent],
  imports: [UserRoutingModule, SharedModule, ProductModule],
})
export class UserModule {}
