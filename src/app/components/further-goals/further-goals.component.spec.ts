import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherGoalsComponent } from './further-goals.component';

describe('FurtherGoalsComponent', () => {
  let component: FurtherGoalsComponent;
  let fixture: ComponentFixture<FurtherGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurtherGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
