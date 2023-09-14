import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerConsulterChargeModalComponent } from './supprimer-consulter-charge-modal.component';

describe('SupprimerConsulterChargeModalComponent', () => {
  let component: SupprimerConsulterChargeModalComponent;
  let fixture: ComponentFixture<SupprimerConsulterChargeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerConsulterChargeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerConsulterChargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
