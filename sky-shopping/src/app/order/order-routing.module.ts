import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order.component';

const orderRoutes: Route[] = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: ':orderId',
    component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
