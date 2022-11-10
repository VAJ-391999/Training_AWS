import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from './products.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productList } from '../test/product/product.fixture';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { IAuthState } from '../shared/redux/auth.store';
import { authUser } from '../test/user/auth-user.fixture';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { Store } from '@ngrx/store';

describe('ProductsComponent', () => {
  let productService = jasmine.createSpyObj(['getProducts']);
  let mockNgRedux: MockNgRedux;
  let ngRedux: NgReduxModule;
  // let productService: Partial<ProductService>;
  // let httpMock: HttpTestingController;
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxTestingModule,
      ],
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: MockNgRedux, useValue: mockNgRedux },
        // { provide: NgReduxModule, useValue: ngRedux },
        // NgReduxModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    // productService = TestBed.inject(ProductService);
    productService.getProducts.and.returnValue(productList);
    mockNgRedux = TestBed.inject(MockNgRedux);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // spyOn(MockNgRedux.getInstance(), 'user' as any).and.returnValue(authUser);
    MockNgRedux.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', inject([Store], (store: any) => {
  //   expect(store).toBeTruthy();
  // }));

  it('should generate product list', () => {
    console.log('test.................');
    // spyOn(MockNgRedux.getInstance(), 'user' as any).and.returnValues({
    //   ...authUser,
    // });
    // const stub = MockNgRedux.getSelectorStub('user');
    // stub.next(authUser);
    const userStub = MockNgRedux.getSelectorStub('user');
    userStub.next(authUser);
    component.user.subscribe((actualValues) =>
      expect(actualValues).toEqual(authUser)
    );
    component.ngOnInit();
    expect(component.products.length).toEqual(1);
  });
});
