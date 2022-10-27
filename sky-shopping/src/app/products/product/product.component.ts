import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css',
    '../../shared/common/common-style.css',
  ],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input()
  product!: Product;
  userSubscription!: Subscription;
  role!: string;
  userId!: string;

  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe({
      next: (res) => {
        this.role = res ? res.role : '';
        this.userId = res ? res.id : '';
      },
    });
  }

  onProductSelect = (productId: string) => {
    console.log('productID', productId);
    this.router.navigate([this.router.url, `${productId}`]);
  };

  addToCart = (productId: string) => {
    this.cartService
      .addToCart({
        userId: this.userId,
        productId,
      })
      .subscribe({
        next: (res) => {
          console.log('Cart', res);
        },
        error: (err) => {
          window.alert(err);
        },
        complete: () => {
          this.router.navigate(['user/cart']);
        },
      });
  };
}
