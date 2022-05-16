import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingProgressComponent } from './working-progress.component';

describe('WorkingProgressComponent', () => {
  let component: WorkingProgressComponent;
  let fixture: ComponentFixture<WorkingProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
