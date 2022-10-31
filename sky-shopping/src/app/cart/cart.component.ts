import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  cart!: Cart;
  productList: Product[] = [];
  userId!: string;
  isPriceValid: boolean = false;

  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('CArt', this.cart);
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
          console.log('Cart', res);
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
