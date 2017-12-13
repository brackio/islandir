import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEmailEditDialogComponent } from './business-email-edit-dialog.component';

describe('BusinessEmailEditDialogComponent', () => {
  let component: BusinessEmailEditDialogComponent;
  let fixture: ComponentFixture<BusinessEmailEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessEmailEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEmailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
