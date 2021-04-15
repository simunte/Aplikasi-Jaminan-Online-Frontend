import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCreateComponent } from './registration-create.component';

describe('RegistrationCreateComponent', () => {
  let component: RegistrationCreateComponent;
  let fixture: ComponentFixture<RegistrationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
