import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from 'src/app/shared/types/product';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css',
    '../../shared/common/common-style.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() role!: string;
  @Input() userId!: string;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly storage: AngularFireStorage
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

  editProduct = (productId: string) => {
    this.router.navigate(['/admin/products/add'], {
      queryParams: {
        edit: true,
        productId,
      },
    });
  };

  deletedProduct = (productId: string) => {
    this.productService.deleteProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.storage['storage'].refFromURL(res.data.imageUrl).delete();
          this.router.navigate(['/admin/dashboard']);
        }
      },
    });
  };
}
