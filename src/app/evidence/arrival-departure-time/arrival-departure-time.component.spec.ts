import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalDepartureTimeComponent } from './arrival-departure-time.component';

describe('ArrivalDepartureTimeComponent', () => {
  let component: ArrivalDepartureTimeComponent;
  let fixture: ComponentFixture<ArrivalDepartureTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalDepartureTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivalDepartureTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
