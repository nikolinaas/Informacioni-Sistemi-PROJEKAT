import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOffDialogComponent } from './log-off-dialog.component';

describe('LogOffDialogComponent', () => {
  let component: LogOffDialogComponent;
  let fixture: ComponentFixture<LogOffDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogOffDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
