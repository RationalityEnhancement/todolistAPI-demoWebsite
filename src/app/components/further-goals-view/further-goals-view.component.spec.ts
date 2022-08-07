import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherGoalsViewComponent } from './further-goals-view.component';

describe('FurtherGoalsViewComponent', () => {
  let component: FurtherGoalsViewComponent;
  let fixture: ComponentFixture<FurtherGoalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurtherGoalsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherGoalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
