import { NgModule } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
    MatProgressBarModule,
    MatSlideToggleModule,
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
