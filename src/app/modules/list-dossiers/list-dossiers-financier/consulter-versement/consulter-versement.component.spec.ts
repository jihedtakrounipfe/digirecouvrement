import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterVersementComponent } from './consulter-versement.component';

describe('ConsulterVersementComponent', () => {
  let component: ConsulterVersementComponent;
  let fixture: ComponentFixture<ConsulterVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulterVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
