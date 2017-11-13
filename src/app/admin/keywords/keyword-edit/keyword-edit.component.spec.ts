import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordEditComponent } from './keyword-edit.component';

describe('KeywordEditComponent', () => {
  let component: KeywordEditComponent;
  let fixture: ComponentFixture<KeywordEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
