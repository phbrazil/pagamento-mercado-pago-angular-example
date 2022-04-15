import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksManagerComponent } from './tasks-manager.component';

describe('TasksManagerComponent', () => {
  let component: TasksManagerComponent;
  let fixture: ComponentFixture<TasksManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
