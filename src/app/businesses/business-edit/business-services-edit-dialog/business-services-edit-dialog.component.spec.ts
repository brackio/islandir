import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessServicesEditDialogComponent } from './business-services-edit-dialog.component';

describe('BusinessServicesEditDialogComponent', () => {
  let component: BusinessServicesEditDialogComponent;
  let fixture: ComponentFixture<BusinessServicesEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessServicesEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessServicesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
