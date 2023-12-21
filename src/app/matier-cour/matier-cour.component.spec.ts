import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatierCourComponent } from './matier-cour.component';

describe('MatierCourComponent', () => {
  let component: MatierCourComponent;
  let fixture: ComponentFixture<MatierCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatierCourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatierCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
