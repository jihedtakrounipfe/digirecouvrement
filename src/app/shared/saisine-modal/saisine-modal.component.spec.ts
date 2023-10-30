import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisineModalComponent } from './saisine-modal.component';

describe('SaisineModalComponent', () => {
  let component: SaisineModalComponent;
  let fixture: ComponentFixture<SaisineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaisineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
