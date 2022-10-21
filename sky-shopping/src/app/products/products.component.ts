import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoaderAction } from '../loader/loader.reducer';
import { Product } from '../shared/types/product';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../shared/common/common-style.css'],
})
export class ProductsComponent implements OnInit {
  loader!: Observable<boolean>;
  products: Product[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly store: Store<any>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loader = this.store.pipe(select((state) => state.loader.isOn));
    this.store.dispatch({ type: LoaderAction.START });
    this.productService.getProducts().subscribe((data) => {
      console.log('product list', data);
      this.products = data.data;
      this.store.dispatch({ type: LoaderAction.STOP });
    });
  }

  onAddProduct = () => {
    this.router.navigate(['/admin/products/add']);
  };

  onProductSelect = (productId: string) => {
    console.log('productID', productId);
    this.router.navigate([this.router.url, `${productId}`]);
  };
}
