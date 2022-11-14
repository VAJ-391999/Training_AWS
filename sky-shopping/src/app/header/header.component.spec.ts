import { NgRedux } from '@angular-redux/store';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { IAuthState } from '../shared/redux/auth.store';
import { Role, UserTokenPayload } from '../shared/types/auth';
import { authUser } from '../test_fixture/user/auth-user.fixture';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let router = jasmine.createSpyObj('Router', ['navigate']);
  // let ngRedux;
  // let usersSelector;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // let spyAuthStore: jasmine.Spy;

  beforeEach(async () => {
    // spyAuthStore = spyOn(
    //   MockNgRedux.getInstance(),
    //   'configureSubStore'
    // ).and.callThrough();
    // MockNgRedux.reset();

    await TestBed.configureTestingModule({
      imports: [NgReduxTestingModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
        // {
        //   provide: NgRedux,
        //   useValue: jasmine.createSpyObj<NgRedux<IAuthState>>([
        //     'dispatch',
        //     'configureStore',
        //     'select',
        //   ]),
        // },
      ],
    }).compileComponents();

    MockNgRedux.reset();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // usersSelector = MockNgRedux.getSelectorStub(['user']);
    // ngRedux = TestBed.get(NgRedux);
    // component.user = spyOn(mockNgRedux, 'select');
    // const stub = MockNgRedux.getSelectorStub<any, any>('user');
    // usersSelector.next(authUser);
    // usersSelector.complete();
    // fixture.detectChanges();
    // spyOn(ngRedux, 'select').and.returnValue(authUser);
    // stub.next(authUser);

    // const mockSubStore = MockNgRedux.getSubStore([
    //   'user',
    //   'isAuthenticated',
    //   'errorMessage',
    // ]);

    // const selectorStub = mockSubStore.getSelectorStub('user');
    // selectorStub.next(authUser);
    // selectorStub.complete();

    // component.user.subscribe((user) => expect(user.role).toEqual('user'));
  });

  it('should create', (done: DoneFn) => {
    const userStub: Subject<UserTokenPayload> = MockNgRedux.getSelectorStub<
      IAuthState,
      UserTokenPayload
    >('user');
    userStub.next(authUser);
    userStub.complete();
    expect(component).toBeTruthy();
    component.user.subscribe({
      next: (res) => {
        expect(res.role).toBe(Role.USER);
      },
    });
  });

  // it('Should run ngOnInit', () => {});

  // it('should logout', () => {
  //   const buttonElement =
  //     fixture.debugElement.nativeElement.querySelector('.btn-logout');
  //   buttonElement.click();
  //   expect(router.navigate).toHaveBeenCalledOnceWith(['/login']);
  // });
});
