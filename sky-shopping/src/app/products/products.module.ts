import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from '../loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
  ],
  declarations: [
    ProductComponent,
    EditProductComponent,
    ProductDetailComponent,
  ],
  exports: [
    ProductComponent,
    EditProductComponent,
    MatCardModule,
    MatGridListModule,
  ],
})
export class ProductModule {}
