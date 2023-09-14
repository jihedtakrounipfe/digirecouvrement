import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVersementComponent } from './new-versement.component';

describe('NewVersementComponent', () => {
  let component: NewVersementComponent;
  let fixture: ComponentFixture<NewVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
