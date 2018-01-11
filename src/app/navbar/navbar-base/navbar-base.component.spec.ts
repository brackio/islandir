import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBaseComponent } from './navbar-base.component';

describe('NavbarBaseComponent', () => {
  let component: NavbarBaseComponent;
  let fixture: ComponentFixture<NavbarBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
