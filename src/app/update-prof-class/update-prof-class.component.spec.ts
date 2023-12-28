import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfClassComponent } from './update-prof-class.component';

describe('UpdateProfClassComponent', () => {
  let component: UpdateProfClassComponent;
  let fixture: ComponentFixture<UpdateProfClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
