import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcaIdComponent } from './tca-id.component';

describe('TcaIdComponent', () => {
  let component: TcaIdComponent;
  let fixture: ComponentFixture<TcaIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcaIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
