import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactEditDialogComponent } from './business-contact-edit-dialog.component';

describe('BusinessContactEditDialogComponent', () => {
  let component: BusinessContactEditDialogComponent;
  let fixture: ComponentFixture<BusinessContactEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessContactEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContactEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
