import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChildComponent } from './edit-child.component';

describe('DeleteChildComponent', () => {
  let component:EditChildComponent;
  let fixture: ComponentFixture<EditChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
