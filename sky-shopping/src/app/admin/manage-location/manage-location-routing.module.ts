import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ManageLocationComponent } from './manage-location.component';

const manageLocationRoutes: Route[] = [
  {
    path: 'manage/location',
    component: ManageLocationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(manageLocationRoutes)],
  exports: [RouterModule],
})
export class ManageLocationRoutingModule {}
