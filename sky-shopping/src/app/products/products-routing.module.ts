import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

export const productRoutes: Route[] = [
  {
    path: 'products',
    component: ProductsComponent,
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}