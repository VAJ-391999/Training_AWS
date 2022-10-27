import { state } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoaderAction } from 'src/app/loader/loader.reducer';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/types/product';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [
    './product-detail.component.css',
    '../../shared/common/common-style.css',
  ],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  loader!: Observable<boolean>;
  product!: Product;
  productSubscription!: Subscription;
  productId!: string;
  userSubscription!: Subscription;
  role!: string;

  constructor(
    private readonly store: Store<any>,
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loader = this.store.pipe(select((state) => state.loader.isOn));
    this.userSubscription = this.authService.user.subscribe({
      next: (res) => {
        this.role = res ? res.role : '';
      },
    });
    this.onInit();
  }

  onInit = () => {
    this.store.dispatch({ type: LoaderAction.START });
    this.activatedRoute.params.subscribe({
      next: (res) => {
        console.log('productId', res);
        this.productId = res['productId'];
        this.productSubscription = this.productService
          .getProductDetail(this.productId)
          .subscribe({
            next: (response) => {
              console.log('Product', response);
              this.product = response.data;
              this.store.dispatch({ type: LoaderAction.STOP });
            },
            error: (err) => {
              console.log('Error', err);
            },
          });
      },
      error: (err) => {
        console.log('err', err);
        window.alert(err);
      },
    });
  };
}
