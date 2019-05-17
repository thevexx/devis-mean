import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashHomeComponent } from './employee-dash-home.component';

describe('EmployeeDashHomeComponent', () => {
  let component: EmployeeDashHomeComponent;
  let fixture: ComponentFixture<EmployeeDashHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
