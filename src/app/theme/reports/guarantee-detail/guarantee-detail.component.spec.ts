import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeDetailComponent } from './guarantee-detail.component';

describe('GuaranteeDetailComponent', () => {
  let component: GuaranteeDetailComponent;
  let fixture: ComponentFixture<GuaranteeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
