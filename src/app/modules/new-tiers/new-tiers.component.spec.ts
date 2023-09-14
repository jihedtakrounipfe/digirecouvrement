import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTiersComponent } from './new-tiers.component';

describe('NewTiersComponent', () => {
  let component: NewTiersComponent;
  let fixture: ComponentFixture<NewTiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
