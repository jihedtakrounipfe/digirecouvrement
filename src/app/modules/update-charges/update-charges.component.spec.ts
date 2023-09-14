import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChargesComponent } from './update-charges.component';

describe('UpdateChargesComponent', () => {
  let component: UpdateChargesComponent;
  let fixture: ComponentFixture<UpdateChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
