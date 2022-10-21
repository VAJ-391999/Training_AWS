import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/products.module';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [AdminRoutingModule, SharedModule, ProductModule],
})
export class AdminModule {}
