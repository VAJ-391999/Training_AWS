import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from '../products/edit-product/edit-product.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductsComponent } from '../products/products.component';
import { NotCompleteGuard } from '../shared/guards/not-complete.guard';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageLocationComponent } from './manage-location/manage-location.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/add',
        component: EditProductComponent,
        canDeactivate: [NotCompleteGuard],
      },
      {
        path: 'products/:productId',
        component: ProductDetailComponent,
      },
      {
        path: 'manage/location',
        component: ManageLocationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
