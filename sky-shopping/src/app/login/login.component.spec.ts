import {
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
  let reduxStoreMock: MockObservableStore<IAuthState>;
  let storeMock: Store<any>;

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgReduxTestingModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: MockObservableStore,
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
    spyOn(authServiceMock, 'isLoggedIn').and.returnValue(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
