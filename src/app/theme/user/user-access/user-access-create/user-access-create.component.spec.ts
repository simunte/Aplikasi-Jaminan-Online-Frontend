import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccessCreateComponent } from './user-access-create.component';

describe('UserAccessCreateComponent', () => {
  let component: UserAccessCreateComponent;
  let fixture: ComponentFixture<UserAccessCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccessCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccessCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
