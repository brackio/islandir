import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDescriptionEditDialogComponent } from './business-description-edit-dialog.component';

describe('BusinessDescriptionEditDialogComponent', () => {
  let component: BusinessDescriptionEditDialogComponent;
  let fixture: ComponentFixture<BusinessDescriptionEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDescriptionEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDescriptionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
