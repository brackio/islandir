import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessManageEditComponent } from './business-manage-edit.component';

describe('BusinessManageEditComponent', () => {
  let component: BusinessManageEditComponent;
  let fixture: ComponentFixture<BusinessManageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessManageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessManageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
