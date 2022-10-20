import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../loader/loader.component';
import { ProductComponent } from '../products/product/product.component';

@NgModule({
  imports: [],
  declarations: [HeaderComponent, LoaderComponent],
  exports: [HeaderComponent, LoaderComponent],
})
export class SharedModule {}
