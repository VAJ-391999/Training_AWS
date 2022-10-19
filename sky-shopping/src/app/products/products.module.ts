import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [ProductRoutingModule],
  declarations: [ProductsComponent],
})
export class ProductRouter {}
