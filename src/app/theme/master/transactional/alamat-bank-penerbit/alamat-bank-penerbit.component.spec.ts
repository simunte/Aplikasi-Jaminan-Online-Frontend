import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlamatBankPenerbitComponent } from './alamat-bank-penerbit.component';

describe('AlamatBankPenerbitComponent', () => {
  let component: AlamatBankPenerbitComponent;
  let fixture: ComponentFixture<AlamatBankPenerbitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlamatBankPenerbitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlamatBankPenerbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
