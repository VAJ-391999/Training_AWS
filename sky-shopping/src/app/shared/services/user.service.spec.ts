import { of } from 'rxjs';
import { newUser, registerUser } from 'src/app/test_fixture/user/user.fixture';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpClientMock = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  let originalTimeout: any;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    userService = new UserService(httpClientMock);
    httpClientMock.post.and.returnValue(
      of({
        error: false,
        message: 'Success',
        data: newUser,
      })
    );
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('Should instanceof UserService', () => {
    expect(userService).toBeInstanceOf(UserService);
  });

  it('Should return registered user info', (done: DoneFn) => {
    userService.createUser(registerUser).subscribe({
      next: (data) => {
        console.log(data);
        expect(data.data.firstName).toEqual(registerUser.firstName);
        done();
      },
      error: done.fail,
    });
  });
});
