import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  newProduct,
  productList,
} from '../test_fixture/product/product.fixture';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let originalTimeout: any;
  let productService: ProductService;
  let httpClientMock = jasmine.createSpyObj('ProductService', ['get', 'post']);

  beforeEach(() => {
    productService = new ProductService(httpClientMock);
  });

  it('should instanceof productService', () => {
    expect(productService).toBeInstanceOf(ProductService);
  });

  describe('Get Product', () => {
    beforeEach(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('Should return product list', (done: DoneFn) => {
      httpClientMock.get.and.returnValue(
        of({
          error: false,
          message: 'Success',
          data: productList,
        })
      );
      productService.getProducts().subscribe({
        next: (data) => {
          expect(data.data.length).toEqual(productList.length);
          done();
        },
        error: done.fail,
      });

      expect(httpClientMock.get.calls.count()).toBe(1);
    });

    // it('should return error response', (done: DoneFn) => {
    //   const errorResponse = new HttpErrorResponse({
    //     error: 'InternalServerError',
    //     status: 500,
    //     statusText: 'InternalServerError',
    //   });

    //   // httpClientMock.get.and.returnValue(of(errorResponse));

    //   //   productService.getProducts().subscribe({
    //   //     next: () => done.fail('InternalServerError'),
    //   //     error: (error) => {
    //   //       console.log('error....', error);
    //   //       expect(error.status).toBe(500);
    //   //       done();
    //   //     },
    //   //   });
    // });
  });
});
