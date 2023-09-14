import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChargesComponent } from './new-charges.component';

describe('NewChargesComponent', () => {
  let component: NewChargesComponent;
  let fixture: ComponentFixture<NewChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
