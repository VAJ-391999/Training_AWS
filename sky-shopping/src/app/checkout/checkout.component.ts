import { state } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { LoaderAction } from '../loader/loader.reducer';
import { paymentMethod } from '../shared/common/payment-method';
import { AuthService } from '../shared/services/auth.service';
import { Cart } from '../shared/types/cart';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  orderSummary!: any;
  loader!: Observable<boolean>;
  cartSubscription!: Subscription;
  orderForm!: FormGroup;
  paymentMethodList: string[] = paymentMethod;
  userId!: string;

  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly store: Store<any>,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loader = this.store.pipe(select((state) => state.loader.isOn));
    this.onInit();
  }

  onInit = () => {
    this.store.dispatch({ type: LoaderAction.START });

    this.orderForm = this.formBuilder.group({
      addressLine1: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      addressLine2: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
    });

    this.authService.user.subscribe((user) => {
      this.userId = user ? user.id : '';
      this.cartService.getCart(this.userId).subscribe();

      this.cartSubscription = this.cartService.cart.subscribe((res) => {
        console.log('order summary', res);
        this.orderSummary = res;
        this.store.dispatch({ type: LoaderAction.STOP });
      });
    });
  };

  placeOrder = (orderForm: FormGroup) => {
    console.log('orderForm', orderForm);
    this.checkoutService
      .placeOrder({
        user: this.userId,
        orderItems: this.orderSummary.items.map((orderItem: any) => {
          return {
            product: orderItem.product._id,
            quantity: orderItem.quantity,
          };
        }),
        orderPrice: this.orderSummary.totalPrice,
        addressLine1: orderForm.value.addressLine1,
        addressLine2: orderForm.value.addressLine2,
        city: orderForm.value.city,
        district: orderForm.value.district,
        state: orderForm.value.state,
        country: orderForm.value.country,
        postalCode: orderForm.value.postalCode,
        paymentMethod: orderForm.value.paymentMethod,
      })
      .subscribe({
        next: (res) => {
          console.log('Place order', res.data);
        },
        error: (err) => {
          window.alert(err);
        },
        complete: () => {},
      });
  };
}
