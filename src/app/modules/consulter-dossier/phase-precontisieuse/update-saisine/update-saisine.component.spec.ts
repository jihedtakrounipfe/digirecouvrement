import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaisineComponent } from './update-saisine.component';

describe('UpdateSaisineComponent', () => {
  let component: UpdateSaisineComponent;
  let fixture: ComponentFixture<UpdateSaisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaisineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSaisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
