import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEntriesComponent } from './my-entries.component';

describe('MyEntriesComponent', () => {
  let component: MyEntriesComponent;
  let fixture: ComponentFixture<MyEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
