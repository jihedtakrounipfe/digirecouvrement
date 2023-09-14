import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaisineComponent } from './new-saisine.component';

describe('NewSaisineComponent', () => {
  let component: NewSaisineComponent;
  let fixture: ComponentFixture<NewSaisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSaisineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSaisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
