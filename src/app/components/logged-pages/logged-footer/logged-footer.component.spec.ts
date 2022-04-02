import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedFooterComponent } from './logged-footer.component';

describe('LoggedFooterComponent', () => {
  let component: LoggedFooterComponent;
  let fixture: ComponentFixture<LoggedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
