import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
  ],
  exports: [MatCardModule, MatGridListModule],
})
export class CartModule {}
