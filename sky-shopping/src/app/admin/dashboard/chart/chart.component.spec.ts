import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check component static value', () => {
    expect(component.framework).toEqual('Angular');
    expect(component.count).toEqual(0);
  });

  it('should increment count on button click', () => {
    component.count = 1;
    const buttonElement = fixture.debugElement.query(By.css('.btn-increase'));
    buttonElement.triggerEventHandler('click', null);
    expect(component.count).toEqual(2);
  });

  it('should change framework on button click', () => {
    const buttonElement =
      fixture.debugElement.nativeElement.querySelector('.change-framework');
    buttonElement.click();
    expect(component.framework).toEqual('React');
  });
});
