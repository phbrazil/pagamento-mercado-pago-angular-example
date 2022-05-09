import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableMemberComponent } from './disable-member.component';

describe('DisableMemberComponent', () => {
  let component: DisableMemberComponent;
  let fixture: ComponentFixture<DisableMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisableMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
