import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChildComponent } from './delete-child.component';

describe('DeleteChildComponent', () => {
  let component: DeleteChildComponent;
  let fixture: ComponentFixture<DeleteChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
