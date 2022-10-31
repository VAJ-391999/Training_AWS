import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
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
  product!: Product;
  productId!: string;
  userSubscription!: Subscription;
  role!: string;
  userId!: string;

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
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
    this.onInit();
  }

  onInit = () => {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.productId = res['productId'];
        this.productService.getProductDetail(this.productId).subscribe({
          next: (response) => {
            this.product = response.data;
          },
        });
      },
    });
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
        complete: () => {
          this.router.navigate(['user/cart']);
        },
      });
  };
}
