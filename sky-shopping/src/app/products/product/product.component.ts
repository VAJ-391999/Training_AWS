import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css',
    '../../shared/common/common-style.css',
  ],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() role!: string;
  @Input() userId!: string;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {}

  onProductSelect = (productId: string) => {
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
        complete: () => {
          this.router.navigate(['user/cart']);
        },
      });
  };
}
