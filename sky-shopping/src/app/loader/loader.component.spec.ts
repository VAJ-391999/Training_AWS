import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { LoaderState } from './loader.reducer';

import { LoaderComponent } from './loader.component';
import { of } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let store: MockStore<{ isOn: boolean }>;
  const initialState = { isOn: true };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    // store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should not display loader when isOn is false', () => {
    let overlayElement =
      fixture.debugElement.nativeElement.querySelector('.overlay');
    console.log(overlayElement);
    expect(overlayElement).toBeFalsy();
  });

  it('Should not display loader when isOn is true', () => {
    // store.setState({ isOn: true });
    // component.loader = of(true);
    let memorizedStore: MemoizedSelector<boolean, true>;
    // memorizedStore =  store.overrideSelector('isOn', true);
    store.overrideSelector('isOn', true);
    store.refreshState();
    let overlayElement =
      fixture.debugElement.nativeElement.querySelector('.overlay');
    console.log(overlayElement);
    expect(overlayElement).toBeFalsy();
  });
});
