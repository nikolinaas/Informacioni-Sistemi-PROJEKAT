import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKindergartenInfoComponent } from './show-kindergarten-info.component';

describe('ShowKindergartenInfoComponent', () => {
  let component: ShowKindergartenInfoComponent;
  let fixture: ComponentFixture<ShowKindergartenInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowKindergartenInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowKindergartenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
