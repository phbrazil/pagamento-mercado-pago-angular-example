import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbdChartComponent } from './lbd-chart.component';

describe('LbdChartComponent', () => {
  let component: LbdChartComponent;
  let fixture: ComponentFixture<LbdChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbdChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LbdChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
