import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseAmiableComponent } from './phase-amiable.component';

describe('PhaseAmiableComponent', () => {
  let component: PhaseAmiableComponent;
  let fixture: ComponentFixture<PhaseAmiableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseAmiableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseAmiableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
