import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBannerComponent } from './trial-banner.component';

describe('TrialBannerComponent', () => {
  let component: TrialBannerComponent;
  let fixture: ComponentFixture<TrialBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
