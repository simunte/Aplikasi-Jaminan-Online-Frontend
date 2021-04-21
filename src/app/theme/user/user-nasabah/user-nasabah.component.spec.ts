import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNasabahComponent } from './user-nasabah.component';

describe('UserNasabahComponent', () => {
  let component: UserNasabahComponent;
  let fixture: ComponentFixture<UserNasabahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNasabahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
