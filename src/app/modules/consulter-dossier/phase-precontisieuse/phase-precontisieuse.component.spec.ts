import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasePrecontisieuseComponent } from './phase-precontisieuse.component';

describe('PhasePrecontisieuseComponent', () => {
  let component: PhasePrecontisieuseComponent;
  let fixture: ComponentFixture<PhasePrecontisieuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasePrecontisieuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasePrecontisieuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
