import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnseignantsComponent } from './home-enseignants.component';

describe('HomeEnseignantsComponent', () => {
  let component: HomeEnseignantsComponent;
  let fixture: ComponentFixture<HomeEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEnseignantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
