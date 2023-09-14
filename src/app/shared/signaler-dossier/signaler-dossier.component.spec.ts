import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalerDossierComponent } from './signaler-dossier.component';

describe('SignalerDossierComponent', () => {
  let component: SignalerDossierComponent;
  let fixture: ComponentFixture<SignalerDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalerDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalerDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
