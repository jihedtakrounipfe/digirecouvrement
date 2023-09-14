import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierModalComponent } from './financier-modal.component';

describe('FinancierModalComponent', () => {
  let component: FinancierModalComponent;
  let fixture: ComponentFixture<FinancierModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
