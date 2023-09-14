import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEcheancierComponent } from './new-echeancier.component';

describe('NewEcheancierComponent', () => {
  let component: NewEcheancierComponent;
  let fixture: ComponentFixture<NewEcheancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEcheancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEcheancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
