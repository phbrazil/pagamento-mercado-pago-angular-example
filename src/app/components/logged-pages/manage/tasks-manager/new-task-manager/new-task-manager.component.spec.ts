import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskManagerComponent } from './new-task-manager.component';

describe('NewTaskManagerComponent', () => {
  let component: NewTaskManagerComponent;
  let fixture: ComponentFixture<NewTaskManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaskManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
