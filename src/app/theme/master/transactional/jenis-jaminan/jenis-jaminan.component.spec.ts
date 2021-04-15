import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JenisJaminanComponent } from './jenis-jaminan.component';

describe('JenisJaminanComponent', () => {
  let component: JenisJaminanComponent;
  let fixture: ComponentFixture<JenisJaminanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JenisJaminanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JenisJaminanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
