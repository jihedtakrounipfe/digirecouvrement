import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseJudiciareComponent } from './phase-judiciare.component';

describe('PhaseJudiciareComponent', () => {
  let component: PhaseJudiciareComponent;
  let fixture: ComponentFixture<PhaseJudiciareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseJudiciareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseJudiciareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
