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
  switchMap,
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
  searchSubscription!: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}
  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    if (formValue) {
      this.searchSubscription = formValue
        ?.pipe(
          pluck('productSearch'),
          debounceTime(2000),
          distinctUntilChanged(),
          switchMap((data) => this.searchProduct(data))
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
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

  searchProduct = (searchTerm: string) => {
    if (searchTerm === '') {
      this.productService.getProducts().subscribe((data) => {
        this.products = data.data;
      });
    } else {
      this.products = this.products.filter((prod) =>
        prod.name.toLocaleLowerCase().includes(searchTerm)
      );
    }

    return searchTerm;
  };
}
