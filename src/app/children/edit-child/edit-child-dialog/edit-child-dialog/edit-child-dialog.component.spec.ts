import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChildDialogComponent } from './edit-child-dialog.component';

describe('EditChildDialogComponent', () => {
  let component: EditChildDialogComponent;
  let fixture: ComponentFixture<EditChildDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChildDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
