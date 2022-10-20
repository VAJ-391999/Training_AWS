import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products.component';

export const productRoutes: Route[] = [
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   children: [
  //     {
  //       path: 'add',
  //       component: EditProductComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
