import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HeaderComponent, LoaderComponent],
  exports: [CommonModule, HeaderComponent, LoaderComponent],
})
export class SharedModule {}
