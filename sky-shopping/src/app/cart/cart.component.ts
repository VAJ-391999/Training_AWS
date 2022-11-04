import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartAction } from '../shared/common/cart-action';
import { UserTokenPayload } from '../shared/types/auth';
import { Cart } from '../shared/types/cart';
import { Product } from '../shared/types/product';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../shared/common/common-style.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart;
  productList: Product[] = [];
  userId!: string;
  isPriceValid: boolean = false;
  userSubscription!: Subscription;
  @select('user') user!: Observable<UserTokenPayload>;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.user.subscribe((res) => {
      this.userId = res ? res.id : '';
      if (this.userId !== '') {
        this.onInit();
      }
    });
  }

  onInit = () => {
    this.cartService.getCart(this.userId).subscribe({
      next: (response) => {
        console.log('Get cart', response);
        this.cart = response.data;
        this.validPrice();
      },
    });
  };

  changeCartItem = (action: string, productId: string) => {
    this.cartService
      .addToCart({
        userId: this.userId,
        productId,
        action: action as CartAction,
      })
      .subscribe({
        next: (res) => {
          this.cart = res.data;
          this.validPrice();
        },
      });
  };

  checkout = () => {
    this.router.navigate(['user', 'checkout']);
  };

  validPrice = () => {
    this.isPriceValid = this.cart.totalPrice === 0 ? false : true;
  };
}
