import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationEditDialogComponent } from './business-location-edit-dialog.component';

describe('BusinessLocationEditDialogComponent', () => {
  let component: BusinessLocationEditDialogComponent;
  let fixture: ComponentFixture<BusinessLocationEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLocationEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLocationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
