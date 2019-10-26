import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextCellTableComponent} from './text-cell-table.component';

describe('TextCellTableComponent', () => {
  let component: TextCellTableComponent;
  let fixture: ComponentFixture<TextCellTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextCellTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextCellTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
