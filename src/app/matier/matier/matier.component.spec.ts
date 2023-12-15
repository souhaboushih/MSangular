import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatierComponent } from './matier.component';

describe('MatierComponent', () => {
  let component: MatierComponent;
  let fixture: ComponentFixture<MatierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


