import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEcheancierComponent } from './update-echeancier.component';

describe('UpdateEcheancierComponent', () => {
  let component: UpdateEcheancierComponent;
  let fixture: ComponentFixture<UpdateEcheancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEcheancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEcheancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
