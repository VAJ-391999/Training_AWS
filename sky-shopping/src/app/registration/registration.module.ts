import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RegistrationRoutingModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ],
  declarations: [RegistrationComponent],
})
export class RegistrationModule {}
