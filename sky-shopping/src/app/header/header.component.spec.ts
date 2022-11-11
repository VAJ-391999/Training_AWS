import { NgRedux } from '@angular-redux/store';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenPayload } from '../shared/types/auth';
import { authUser } from '../test_fixture/user/auth-user.fixture';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let router = jasmine.createSpyObj('Router', ['navigate']);
  let mockNgRedux: NgRedux<any>;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    MockNgRedux.reset();
    mockNgRedux = MockNgRedux.getInstance();
    await TestBed.configureTestingModule({
      imports: [NgReduxTestingModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // component.user = spyOn(mockNgRedux, 'select');
    // const stub = MockNgRedux.getSelectorStub<any, any>('user');
    // component.user = stub;
    // stub.next(authUser);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should run ngOnInit', () => {});

  // it('should logout', () => {
  //   const buttonElement =
  //     fixture.debugElement.nativeElement.querySelector('.btn-logout');
  //   buttonElement.click();
  //   expect(router.navigate).toHaveBeenCalledOnceWith(['/login']);
  // });
});
