import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
  declarations: [HeaderComponent, LoaderComponent],
  exports: [CommonModule, HeaderComponent, LoaderComponent],
})
export class SharedModule {}
