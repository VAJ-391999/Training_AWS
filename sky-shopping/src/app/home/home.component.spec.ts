import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate once on login', () => {
    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('.btn-home-login');
    buttonElement.click();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('Should navigate once on registration', () => {
    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('.btn-home-register');
    buttonElement.click();
    expect(router.navigate).toHaveBeenCalledWith(['/registration']);
  });
});
