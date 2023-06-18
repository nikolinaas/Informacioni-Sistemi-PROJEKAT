import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCostsComponent } from './monthly-costs.component';

describe('MonthlyCostsComponent', () => {
  let component: MonthlyCostsComponent;
  let fixture: ComponentFixture<MonthlyCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
