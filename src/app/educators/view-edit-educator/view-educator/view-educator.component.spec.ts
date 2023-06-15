import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEducatorComponent } from './view-educator.component';

describe('ViewEducatorComponent', () => {
  let component: ViewEducatorComponent;
  let fixture: ComponentFixture<ViewEducatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEducatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEducatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
