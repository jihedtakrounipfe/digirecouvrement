import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeSpecifiqueComponent } from './demande-specifique.component';

describe('DemandeSpecifiqueComponent', () => {
  let component: DemandeSpecifiqueComponent;
  let fixture: ComponentFixture<DemandeSpecifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeSpecifiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeSpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
