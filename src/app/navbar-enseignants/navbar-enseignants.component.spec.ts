import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEnseignantsComponent } from './navbar-enseignants.component';

describe('NavbarEnseignantsComponent', () => {
  let component: NavbarEnseignantsComponent;
  let fixture: ComponentFixture<NavbarEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarEnseignantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
