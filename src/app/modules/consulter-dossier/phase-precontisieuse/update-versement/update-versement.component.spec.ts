import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVersementComponent } from './update-versement.component';

describe('UpdateVersementComponent', () => {
  let component: UpdateVersementComponent;
  let fixture: ComponentFixture<UpdateVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
