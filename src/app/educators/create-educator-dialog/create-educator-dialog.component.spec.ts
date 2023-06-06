import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducatorDialogComponent } from './create-educator-dialog.component';

describe('CreateEducatorDialogComponent', () => {
  let component: CreateEducatorDialogComponent;
  let fixture: ComponentFixture<CreateEducatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEducatorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEducatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
