import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Elements,
  Element as StripeElement,
  ElementsOptions,
  StripeService,
} from 'ngx-stripe';
import { Observable, Subscription } from 'rxjs';
import { ManageLocationService } from '../admin/manage-location/manage-location.service';
import { CartService } from '../cart/cart.service';
import {
  City,
  Country,
  District,
  LocationField,
  State,
} from '../shared/common/location';
import { paymentMethod } from '../shared/common/payment-method';
import { UserTokenPayload } from '../shared/types/auth';
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
  @select('user') user!: Observable<UserTokenPayload>;
  countryList: string[] = [];
  stateList: string[] = [];
  districtList: string[] = [];
  cityList: string[] = [];

  elementsOptions: ElementsOptions = {
    locale: 'en',
  };

  fullNameValidator = [Validators.minLength(3), Validators.maxLength(20)];
  amountValidator = [Validators.min(1), Validators.max(10000)];

  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly formBuilder: FormBuilder,
    private readonly stripeService: StripeService,
    private readonly router: Router,
    private readonly manageLocationService: ManageLocationService
  ) {}

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.onInit();
    this.initCountry();
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
      country: ['', [Validators.required]],
      state: [{ value: '', disabled: true }, [Validators.required]],
      district: [{ value: '', disabled: true }, [Validators.required]],
      city: [{ value: '', disabled: true }, [Validators.required]],
      postalCode: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      fullName: ['', this.fullNameValidator],
    });

    this.userSubscription = this.user.subscribe((user) => {
      this.userId = user ? user.id : '';
      this.cartService.getCart(this.userId).subscribe();

      this.cartSubscription = this.cartService.cart.subscribe((res) => {
        this.orderSummary = res;
      });
    });
  };

  placeOrder = (orderForm: FormGroup) => {
    const name = orderForm.get('fullName')!.value;

    if (orderForm.value.paymentMethod === 'Credit Card') {
      this.stripeService
        .createToken(this.card, { name })
        .subscribe((result) => {
          if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            this.createNewOrder(orderForm, result.token);

            console.log(result.token);
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
        });
    } else {
      this.createNewOrder(orderForm);
    }
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

  createNewOrder = (orderForm: FormGroup, token?: any) => {
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
      stripeToken: token ?? '',
    };

    this.checkoutService.placeOrder(createOrder).subscribe({
      next: (res) => {
        console.log('Place order', res.data);
      },
      complete: () => {
        this.router.navigate(['user', 'order']);
      },
    });
  };

  initCountry = () => {
    this.manageLocationService
      .retrieveLocation(LocationField.COUNTRY.toLocaleLowerCase())
      .subscribe({
        next: (res: Country[]) => {
          if (res.length > 0) {
            this.countryList = res.map((country: Country) => country.name);
          }
        },
      });
  };

  changeCountry = (countryName: string) => {
    console.log(countryName);
    this.orderForm.get('state')!.enable();
    this.orderForm.controls['state'].setValue('');
    this.orderForm.controls['district'].setValue('');
    this.orderForm.controls['city'].setValue('');
    this.manageLocationService
      .retrieveLocation(LocationField.STATE.toLocaleLowerCase())
      .subscribe({
        next: (res: State[]) => {
          if (res.length > 0) {
            this.stateList = res
              .filter((state: State) => state.country === countryName)
              .map((stateItem) => stateItem.name);
          }
        },
      });
  };

  changeState = (stateName: string) => {
    console.log(stateName);
    this.orderForm.get('district')!.enable();
    this.orderForm.controls['district'].setValue('');
    this.orderForm.controls['city'].setValue('');
    this.manageLocationService
      .retrieveLocation(LocationField.DISTRICT.toLocaleLowerCase())
      .subscribe({
        next: (res: District[]) => {
          if (res.length > 0) {
            this.districtList = res
              .filter(
                (district: District) =>
                  district.state === stateName &&
                  district.country === this.orderForm.get('country')!.value
              )
              .map((districtItem) => districtItem.name);
          }
        },
      });
  };

  changeDistrict = (districtName: string) => {
    console.log(districtName);
    this.orderForm.get('city')!.enable();
    this.orderForm.controls['city'].setValue('');
    this.manageLocationService
      .retrieveLocation(LocationField.CITY.toLocaleLowerCase())
      .subscribe({
        next: (res: City[]) => {
          if (res.length > 0) {
            this.cityList = res
              .filter(
                (city: City) =>
                  city.district === districtName &&
                  city.state === this.orderForm.get('state')!.value &&
                  city.country === this.orderForm.get('country')!.value
              )
              .map((cityItem) => cityItem.name);
          }
        },
      });
  };
}
