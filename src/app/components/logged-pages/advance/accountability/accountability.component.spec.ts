import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountabilityComponent } from './accountability.component';

describe('AccountabilityComponent', () => {
  let component: AccountabilityComponent;
  let fixture: ComponentFixture<AccountabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
