import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoaderAction } from '../loader/loader.reducer';
import { ProductService } from '../products/products.service';
import { CartAction } from '../shared/common/cart-action';
import { AuthService } from '../shared/services/auth.service';
import { Cart } from '../shared/types/cart';
import { Product } from '../shared/types/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../shared/common/common-style.css'],
})
export class CartComponent implements OnInit {
  loader!: Observable<boolean>;
  cart!: Cart;
  productList: Product[] = [];
  userId!: string;

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly store: Store<any>,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loader = this.store.pipe(select((state) => state.loader.isOn));
    this.store.dispatch({ type: LoaderAction.START });
    this.authService.user.subscribe((res) => {
      this.userId = res ? res.id : '';
      this.onInit();
    });
  }

  onInit = () => {
    console.log('userId', this.userId);
    this.cartService.getCart(this.userId).subscribe({
      next: (response) => {
        console.log('Get cart', response);
        this.cart = response.data;
        this.store.dispatch({ type: LoaderAction.STOP });
      },
      error: (err) => {
        window.alert(err);
      },
    });
  };

  changeCartItem = (action: string, productId: string) => {
    this.store.dispatch({ type: LoaderAction.START });
    this.cartService
      .addToCart({
        userId: this.userId,
        productId,
        action: action as CartAction,
      })
      .subscribe({
        next: (res) => {
          console.log('Cart', res);
          this.cart = res.data;
          this.store.dispatch({ type: LoaderAction.STOP });
        },
        error: (err) => {
          window.alert(err);
        },
      });
  };
}
