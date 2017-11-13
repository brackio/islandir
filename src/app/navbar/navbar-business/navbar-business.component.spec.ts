import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBusinessComponent } from './navbar-business.component';

describe('NavbarBusinessComponent', () => {
  let component: NavbarBusinessComponent;
  let fixture: ComponentFixture<NavbarBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
