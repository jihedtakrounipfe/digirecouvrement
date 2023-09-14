import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossiersDirecteurComponent } from './list-dossiers-directeur.component';

describe('ListDossiersDirecteurComponent', () => {
  let component: ListDossiersDirecteurComponent;
  let fixture: ComponentFixture<ListDossiersDirecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDossiersDirecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossiersDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
