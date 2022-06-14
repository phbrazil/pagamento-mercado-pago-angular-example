import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancelSubscribeComponent } from './confirm-cancel-subscribe.component';

describe('ConfirmCancelSubscribeComponent', () => {
  let component: ConfirmCancelSubscribeComponent;
  let fixture: ComponentFixture<ConfirmCancelSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCancelSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCancelSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
