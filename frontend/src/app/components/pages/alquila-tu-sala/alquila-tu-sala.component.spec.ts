import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilaTuSalaComponent } from './alquila-tu-sala.component';

describe('AlquilaTuSalaComponent', () => {
  let component: AlquilaTuSalaComponent;
  let fixture: ComponentFixture<AlquilaTuSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquilaTuSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquilaTuSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
