import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChargesComponent } from './list-charges.component';

describe('ListChargesComponent', () => {
  let component: ListChargesComponent;
  let fixture: ComponentFixture<ListChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
