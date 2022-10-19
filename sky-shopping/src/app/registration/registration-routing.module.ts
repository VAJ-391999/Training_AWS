import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';

const registrationRoutes: Route[] = [
  {
    path: 'registration',
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(registrationRoutes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
