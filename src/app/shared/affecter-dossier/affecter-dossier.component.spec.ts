import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterDossierComponent } from './affecter-dossier.component';

describe('AffecterDossierComponent', () => {
  let component: AffecterDossierComponent;
  let fixture: ComponentFixture<AffecterDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
