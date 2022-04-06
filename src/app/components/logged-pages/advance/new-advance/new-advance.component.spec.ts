import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvanceComponent } from './new-advance.component';

describe('NewAdvanceComponent', () => {
  let component: NewAdvanceComponent;
  let fixture: ComponentFixture<NewAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
