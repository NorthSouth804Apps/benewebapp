import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTipComponent } from './select-tip.component';

describe('SelectTipComponent', () => {
  let component: SelectTipComponent;
  let fixture: ComponentFixture<SelectTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
