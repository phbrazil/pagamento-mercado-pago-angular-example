import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableMemberComponent } from './enable-member.component';

describe('EnableMemberComponent', () => {
  let component: EnableMemberComponent;
  let fixture: ComponentFixture<EnableMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
