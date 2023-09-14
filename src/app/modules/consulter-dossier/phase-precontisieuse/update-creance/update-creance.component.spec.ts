import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCreanceComponent } from './update-creance.component';

describe('UpdateCreanceComponent', () => {
  let component: UpdateCreanceComponent;
  let fixture: ComponentFixture<UpdateCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCreanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
