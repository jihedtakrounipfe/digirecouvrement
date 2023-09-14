import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDossierComponent } from './consulter-dossier.component';

describe('ConsulterDossierComponent', () => {
  let component: ConsulterDossierComponent;
  let fixture: ComponentFixture<ConsulterDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
