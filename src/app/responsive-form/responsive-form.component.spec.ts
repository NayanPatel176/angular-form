import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveFormComponent } from './responsive-form.component';

describe('ResponsiveFormComponent', () => {
  let component: ResponsiveFormComponent;
  let fixture: ComponentFixture<ResponsiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
