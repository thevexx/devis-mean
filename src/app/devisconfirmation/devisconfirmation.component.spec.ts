import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisconfirmationComponent } from './devisconfirmation.component';

describe('DevisconfirmationComponent', () => {
  let component: DevisconfirmationComponent;
  let fixture: ComponentFixture<DevisconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
