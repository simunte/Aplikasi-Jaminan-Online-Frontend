import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcaEnComponent } from './tca-en.component';

describe('TcaEnComponent', () => {
  let component: TcaEnComponent;
  let fixture: ComponentFixture<TcaEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcaEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcaEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
