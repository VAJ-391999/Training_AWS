import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from 'src/app/shared/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input()
  product!: Product;
  roleSubscription!: Subscription;
  role!: string;

  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.roleSubscription = this.authService.role.subscribe({
      next: (res) => {
        this.role = res;
      },
    });
  }
}
