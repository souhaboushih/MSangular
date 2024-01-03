import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursListEleveComponent } from './cours-list-eleve.component';

describe('CoursListEleveComponent', () => {
  let component: CoursListEleveComponent;
  let fixture: ComponentFixture<CoursListEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursListEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursListEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
