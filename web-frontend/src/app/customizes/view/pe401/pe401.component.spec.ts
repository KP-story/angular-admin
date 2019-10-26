import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PE401Component} from './pe401.component';

describe('PE401Component', () => {
  let component: PE401Component;
  let fixture: ComponentFixture<PE401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PE401Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PE401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
