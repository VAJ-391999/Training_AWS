import { NgReduxModule } from '@angular-redux/store';
import {
  MockNgRedux,
  MockObservableStore,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { IAuthState } from '../shared/redux/auth.store';
import { AuthService } from '../shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let authServiceMock: AuthService;
  let reduxStoreMock: MockNgRedux<IAuthState>;
  let storeMock: Store<any>;
  let httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    // reduxStoreMock = TestBed.get(MockNgRedux);
    authServiceMock = new AuthService(
      httpClientMock,
      routerMock,
      reduxStoreMock
    );
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxTestingModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        NgReduxModule,
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: MockNgRedux,
          useValue: reduxStoreMock,
        },
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reduxStoreMock = TestBed.get(MockNgRedux);

    // authServiceMock.isLoggedIn.and.returnValue(false);
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
    spyOn(reduxStoreMock, 'dispatch').and.returnValue({});
    expect(authServiceMock.isLoggedIn).toEqual(false);
  });
});
