import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAdvanceComponent } from './receipt-advance.component';

describe('ReceiptAdvanceComponent', () => {
  let component: ReceiptAdvanceComponent;
  let fixture: ComponentFixture<ReceiptAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
