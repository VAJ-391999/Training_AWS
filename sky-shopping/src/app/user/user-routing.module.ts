import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { OrderComponent } from '../order/order.component';
import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductsComponent } from '../products/products.component';
import { NotCompleteGuard } from '../shared/guards/not-complete.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:productId',
        component: ProductDetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canDeactivate: [NotCompleteGuard],
      },
      {
        path: 'order',
        loadChildren: () =>
          import('../order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
