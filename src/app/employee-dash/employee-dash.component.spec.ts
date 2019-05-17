import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashComponent } from './employee-dash.component';

describe('EmployeeDashComponent', () => {
  let component: EmployeeDashComponent;
  let fixture: ComponentFixture<EmployeeDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
