import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPhoneEditDialogComponent } from './business-phone-edit-dialog.component';

describe('BusinessPhoneEditDialogComponent', () => {
  let component: BusinessPhoneEditDialogComponent;
  let fixture: ComponentFixture<BusinessPhoneEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPhoneEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPhoneEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
