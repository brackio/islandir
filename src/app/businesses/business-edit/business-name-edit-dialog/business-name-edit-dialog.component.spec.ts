import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessNameEditDialogComponent } from './business-name-edit-dialog.component';

describe('BusinessNameEditDialogComponent', () => {
  let component: BusinessNameEditDialogComponent;
  let fixture: ComponentFixture<BusinessNameEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessNameEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessNameEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
