import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/products.module';
import { ManageLocationModule } from './manage-location/manage-location.module';
import { ExponentialStrengthPipe } from '../shared/pipes/exponential-strength.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ExponentialStrengthPipe],
  imports: [
    AdminRoutingModule,
    SharedModule,
    ProductModule,
    ManageLocationModule,
    FormsModule,
  ],
})
export class AdminModule {}
