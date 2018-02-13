import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTileComponent } from './business-tile.component';

describe('BusinessTileComponent', () => {
  let component: BusinessTileComponent;
  let fixture: ComponentFixture<BusinessTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
