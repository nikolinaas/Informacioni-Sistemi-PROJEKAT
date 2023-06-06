import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEducatorDialogComponent } from './delete-educator-dialog.component';

describe('DeleteEducatorDialogComponent', () => {
  let component: DeleteEducatorDialogComponent;
  let fixture: ComponentFixture<DeleteEducatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEducatorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEducatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
