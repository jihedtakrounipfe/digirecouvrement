import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetailFraisComponent } from './update-detail-frais.component';

describe('UpdateDetailFraisComponent', () => {
  let component: UpdateDetailFraisComponent;
  let fixture: ComponentFixture<UpdateDetailFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDetailFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetailFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
