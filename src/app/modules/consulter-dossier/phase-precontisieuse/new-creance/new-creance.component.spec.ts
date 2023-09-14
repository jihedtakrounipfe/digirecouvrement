import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreanceComponent } from './new-creance.component';

describe('NewCreanceComponent', () => {
  let component: NewCreanceComponent;
  let fixture: ComponentFixture<NewCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
