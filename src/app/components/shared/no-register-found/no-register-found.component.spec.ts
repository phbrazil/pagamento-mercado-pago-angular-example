import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRegisterFoundComponent } from './no-register-found.component';

describe('NoRegisterFoundComponent', () => {
  let component: NoRegisterFoundComponent;
  let fixture: ComponentFixture<NoRegisterFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRegisterFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRegisterFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
