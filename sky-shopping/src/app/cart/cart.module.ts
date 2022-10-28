import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [MatButtonModule, MatGridListModule, MatCardModule, SharedModule],
  declarations: [CartComponent],
  exports: [MatCardModule, MatGridListModule],
})
export class CartModule {}
