import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from './products.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productList } from '../test_fixture/product/product.fixture';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { IAuthState } from '../shared/redux/auth.store';
import { authUser } from '../test_fixture/user/auth-user.fixture';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('ProductsComponent', () => {
  // let productService = jasmine.createSpyObj('ProductService', ['getProducts']);
  let mockNgRedux: MockNgRedux;
  let storeMock: MockStore<{ isOn: boolean }>;
  const initialState = { isOn: false };
  let httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
  let productService = new ProductService(httpClientMock);

  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatCardModule,
        SharedModule,
        MatProgressBarModule,
        MatSlideToggleModule,
        NgReduxTestingModule,
      ],
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: MockNgRedux, useValue: mockNgRedux },
        provideMockStore({ initialState }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    httpClientMock.get.and.returnValue(of(productList));
    mockNgRedux = TestBed.inject(MockNgRedux);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // spyOn(MockNgRedux.getInstance(), 'user' as any).and.returnValue(authUser);
    MockNgRedux.reset();
    storeMock = TestBed.get<Store>(Store);
  });

  it('should create', (done: DoneFn) => {
    productService.getProducts().subscribe({
      next: (data) => {
        // component.products = data.data;
        expect(data.data.length).toEqual(productList.length);
        done();
      },
      error: done.fail,
    });
    // expect(component).toBeTruthy();
  });

  // it('should create', inject([Store], (store: any) => {
  //   expect(store).toBeTruthy();
  // }));

  // it('should generate product list', () => {
  //   console.log('test.................');
  //   // spyOn(MockNgRedux.getInstance(), 'user' as any).and.returnValues({
  //   //   ...authUser,
  //   // });
  //   // const stub = MockNgRedux.getSelectorStub('user');
  //   // stub.next(authUser);
  //   const userStub = MockNgRedux.getSelectorStub('user');
  //   userStub.next(authUser);
  //   component.user.subscribe((actualValues) =>
  //     expect(actualValues).toEqual(authUser)
  //   );
  //   component.ngOnInit();
  //   expect(component.products.length).toEqual(1);
  // });
});
