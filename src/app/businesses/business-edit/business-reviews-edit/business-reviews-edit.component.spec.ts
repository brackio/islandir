import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReviewsEditComponent } from './business-reviews-edit.component';

describe('BusinessReviewsEditComponent', () => {
  let component: BusinessReviewsEditComponent;
  let fixture: ComponentFixture<BusinessReviewsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReviewsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessReviewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
