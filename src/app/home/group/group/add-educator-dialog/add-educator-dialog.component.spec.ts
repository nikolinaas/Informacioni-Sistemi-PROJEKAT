import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducatorDialogComponent } from './add-educator-dialog.component';

describe('AddEducatorDialogComponent', () => {
  let component: AddEducatorDialogComponent;
  let fixture: ComponentFixture<AddEducatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEducatorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEducatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
