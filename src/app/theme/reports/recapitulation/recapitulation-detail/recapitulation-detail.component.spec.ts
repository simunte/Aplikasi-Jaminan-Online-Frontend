import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecapitulationDetailComponent } from './recapitulation-detail.component';


describe('RegistrationEditComponent', () => {
  let component: RecapitulationDetailComponent;
  let fixture: ComponentFixture<RecapitulationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapitulationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapitulationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
