import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [HomeRoutingModule, MatButtonModule],
  declarations: [HomeComponent],
})
export class HomeRouters {}
