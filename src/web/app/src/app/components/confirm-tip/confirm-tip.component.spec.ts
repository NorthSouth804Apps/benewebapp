import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTipComponent } from './confirm-tip.component';

describe('ConfirmTipComponent', () => {
  let component: ConfirmTipComponent;
  let fixture: ComponentFixture<ConfirmTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
