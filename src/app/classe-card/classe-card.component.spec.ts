import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseCardComponent } from './classe-card.component';

describe('ClasseCardComponent', () => {
  let component: ClasseCardComponent;
  let fixture: ComponentFixture<ClasseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
