import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSalasComponent } from './ver-salas.component';

describe('VerSalasComponent', () => {
  let component: VerSalasComponent;
  let fixture: ComponentFixture<VerSalasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSalasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
