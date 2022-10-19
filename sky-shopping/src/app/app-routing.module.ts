import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthOnLoadGuardService as AuthOnLoadGuard } from './shared/guards/auth.guard';
import { AuthGuardService as AuthGuard } from './shared/guards/auth-onload.guard';
import { NotFoundComponent } from './not-found/not-found.component';

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
    path: '',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductRouter),
    canLoad: [AuthOnLoadGuard],
    canActivate: [AuthGuard],
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
export class AppRouter {}
