import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterTimeFormComponent } from './center-time-form.component';

describe('CenterTimeFormComponent', () => {
  let component: CenterTimeFormComponent;
  let fixture: ComponentFixture<CenterTimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterTimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
