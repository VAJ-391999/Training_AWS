import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
  ],
  declarations: [ProductComponent, EditProductComponent],
  exports: [ProductComponent, EditProductComponent],
})
export class ProductModule {}
