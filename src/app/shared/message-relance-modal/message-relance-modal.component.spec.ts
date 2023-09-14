import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRelanceModalComponent } from './message-relance-modal.component';

describe('MessageRelanceModalComponent', () => {
  let component: MessageRelanceModalComponent;
  let fixture: ComponentFixture<MessageRelanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageRelanceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRelanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
