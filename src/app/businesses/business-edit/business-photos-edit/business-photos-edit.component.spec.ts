import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPhotosEditComponent } from './business-photos-edit.component';

describe('BusinessPhotosEditComponent', () => {
  let component: BusinessPhotosEditComponent;
  let fixture: ComponentFixture<BusinessPhotosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPhotosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPhotosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
