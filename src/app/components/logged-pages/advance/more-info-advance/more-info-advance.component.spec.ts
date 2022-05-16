import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoComponentAdvance } from './more-info-advance.component';

describe('MoreInfoComponent', () => {
  let component: MoreInfoComponentAdvance;
  let fixture: ComponentFixture<MoreInfoComponentAdvance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInfoComponentAdvance ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoComponentAdvance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
