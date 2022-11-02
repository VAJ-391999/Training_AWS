import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
  ],
  declarations: [OrderComponent, OrderDetailComponent],
})
export class OrderModule {}
