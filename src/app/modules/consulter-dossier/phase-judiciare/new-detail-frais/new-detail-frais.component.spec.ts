import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDetailFraisComponent } from './new-detail-frais.component';

describe('NewDetailFraisComponent', () => {
  let component: NewDetailFraisComponent;
  let fixture: ComponentFixture<NewDetailFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDetailFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDetailFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
