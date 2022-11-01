import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Elements,
  Element as StripeElement,
  ElementsOptions,
  StripeService,
} from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { paymentMethod } from '../shared/common/payment-method';
import { AuthService } from '../shared/services/auth.service';
import { CreateOrder } from '../shared/types/order';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../shared/common/common-style.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  orderSummary!: any;
  cartSubscription!: Subscription;
  userSubscription!: Subscription;
  orderForm!: FormGroup;
  paymentMethodList: string[] = paymentMethod;
  userId!: string;
  elements!: Elements;
  card!: StripeElement;

  elementsOptions: ElementsOptions = {
    locale: 'en',
  };

  fullNameValidator = [Validators.minLength(3), Validators.maxLength(20)];
  amountValidator = [Validators.min(1), Validators.max(10000)];

  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly stripeService: StripeService
  ) {}

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.onInit();
  }

  cardGenerator = () => {
    this.stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0',
              },
            },
          },
        });
        this.card.mount('#card-element');
      }
    });
  };

  onInit = () => {
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
      fullName: ['', this.fullNameValidator],
    });

    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user ? user.id : '';
      this.cartService.getCart(this.userId).subscribe();

      this.cartSubscription = this.cartService.cart.subscribe((res) => {
        console.log('order summary', res);
        this.orderSummary = res;
      });
    });
  };

  placeOrder = (orderForm: FormGroup) => {
    console.log('orderForm', orderForm);

    const name = orderForm.get('fullName')!.value;
    this.stripeService.createToken(this.card, { name }).subscribe((result) => {
      if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges

        const createOrder: CreateOrder = {
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
          fullName: orderForm.value.fullName,
          stripeToken: result.token ?? '',
        };

        this.checkoutService.placeOrder(createOrder).subscribe({
          next: (res) => {
            console.log('Place order', res.data);
          },
          complete: () => {},
        });

        console.log(result.token);
      } else if (result.error) {
        // Error creating the token
        console.log(result.error.message);
      }
    });
  };

  paymentMethodChange = (paymentMethod: string) => {
    console.log(paymentMethod);
    if (paymentMethod === 'Credit Card') {
      this.cardGenerator();
    }
    //   if (paymentMethod === 'Cash on Delivery') {
    //     this.orderForm
    //       .get('fullName')!
    //       .setValidators(this.fullNameValidator.concat(Validators.required));
    //     this.orderForm
    //       .get('amount')!
    //       .setValidators(this.fullNameValidator.concat(Validators.required));
    //   } else {
    //     this.orderForm.get('myEmailField')!.setValidators(this.fullNameValidator);
    //     this.orderForm.get('amount')!.setValidators(this.amountValidator);
    //   }
  };
}
