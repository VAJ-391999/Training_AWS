import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageLocationRoutingModule } from './manage-location-routing.module';
import { ManageLocationComponent } from './manage-location.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { LocationFormComponent } from './location-form/location-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    ManageLocationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    SharedModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
  ],
  declarations: [ManageLocationComponent, LocationFormComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class ManageLocationModule {}
