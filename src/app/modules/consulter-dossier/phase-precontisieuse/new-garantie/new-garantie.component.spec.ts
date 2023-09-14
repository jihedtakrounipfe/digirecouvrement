import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGarantieComponent } from './new-garantie.component';

describe('NewGarantieComponent', () => {
  let component: NewGarantieComponent;
  let fixture: ComponentFixture<NewGarantieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGarantieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGarantieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
