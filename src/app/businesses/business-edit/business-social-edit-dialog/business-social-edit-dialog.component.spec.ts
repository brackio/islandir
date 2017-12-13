import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSocialEditDialogComponent } from './business-social-edit-dialog.component';

describe('BusinessSocialEditDialogComponent', () => {
  let component: BusinessSocialEditDialogComponent;
  let fixture: ComponentFixture<BusinessSocialEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSocialEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSocialEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
