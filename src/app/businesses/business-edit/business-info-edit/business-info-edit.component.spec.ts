import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoEditComponent } from './business-info-edit.component';

describe('BusinessInfoEditComponent', () => {
  let component: BusinessInfoEditComponent;
  let fixture: ComponentFixture<BusinessInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
