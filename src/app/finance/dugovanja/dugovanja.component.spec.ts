import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DugovanjaComponent } from './dugovanja.component';

describe('DugovanjaComponent', () => {
  let component: DugovanjaComponent;
  let fixture: ComponentFixture<DugovanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DugovanjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DugovanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
