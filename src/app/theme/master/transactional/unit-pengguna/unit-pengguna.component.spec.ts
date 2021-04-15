import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPenggunaComponent } from './unit-pengguna.component';

describe('UnitPenggunaComponent', () => {
  let component: UnitPenggunaComponent;
  let fixture: ComponentFixture<UnitPenggunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitPenggunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitPenggunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
