import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MjesecniTroskoviComponent } from './mjesecni-troskovi.component';

describe('MjesecniTroskoviComponent', () => {
  let component: MjesecniTroskoviComponent;
  let fixture: ComponentFixture<MjesecniTroskoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MjesecniTroskoviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MjesecniTroskoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
