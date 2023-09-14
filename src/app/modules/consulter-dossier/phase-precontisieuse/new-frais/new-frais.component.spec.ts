import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFraisComponent } from './new-frais.component';

describe('NewFraisComponent', () => {
  let component: NewFraisComponent;
  let fixture: ComponentFixture<NewFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
