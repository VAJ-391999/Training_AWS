import { select } from '@angular-redux/store';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  pluck,
  Subscription,
} from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { UserTokenPayload } from '../shared/types/auth';
import { Product } from '../shared/types/product';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../shared/common/common-style.css'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchForm') searchForm!: NgForm;
  products: Product[] = [];
  userSubscription!: Subscription;
  role!: string;
  userId!: string;
  @select('user') user!: Observable<UserTokenPayload>;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}
  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    formValue
      ?.pipe(
        // map((data) => data.productSearch)
        pluck('productSearch'),
        debounceTime(5000),
        distinctUntilChanged(),
        concatMap((data) => data)
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.data;
      this.userSubscription = this.user.subscribe((userDetail) => {
        (this.role = userDetail ? userDetail.role : ''),
          (this.userId = userDetail ? userDetail.id : '');
      });
    });
  }

  onAddProduct = () => {
    this.router.navigate(['/admin/products/add'], {
      queryParams: {
        edit: false,
      },
    });
  };
}
