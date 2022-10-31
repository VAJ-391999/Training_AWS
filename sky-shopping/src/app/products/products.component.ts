import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Product } from '../shared/types/product';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../shared/common/common-style.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  userSubscription!: Subscription;
  role!: string;
  userId!: string;

  constructor(
    private readonly productService: ProductService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.data;
      this.userSubscription = this.authService.user.subscribe((userDetail) => {
        (this.role = userDetail ? userDetail.role : ''),
          (this.userId = userDetail ? userDetail.id : '');
      });
    });
  }

  onAddProduct = () => {
    this.router.navigate(['/admin/products/add']);
  };
}
