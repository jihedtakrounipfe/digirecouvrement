import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossiersFinancierComponent } from './list-dossiers-financier.component';

describe('ListDossiersFinancierComponent', () => {
  let component: ListDossiersFinancierComponent;
  let fixture: ComponentFixture<ListDossiersFinancierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDossiersFinancierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossiersFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
