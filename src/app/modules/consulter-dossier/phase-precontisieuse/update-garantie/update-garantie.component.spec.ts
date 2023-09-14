import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGarantieComponent } from './update-garantie.component';

describe('UpdateGarantieComponent', () => {
  let component: UpdateGarantieComponent;
  let fixture: ComponentFixture<UpdateGarantieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGarantieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGarantieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
