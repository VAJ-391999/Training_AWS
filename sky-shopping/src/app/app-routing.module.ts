import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoleGuardService } from './shared/guards/role.guard';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeRouters),
  },
  {
    path: '',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'admin',
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 'user',
    },
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
