import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaPrivacidadComponent } from './politica-privacidad.component';

describe('PoliticaPrivacidadComponent', () => {
  let component: PoliticaPrivacidadComponent;
  let fixture: ComponentFixture<PoliticaPrivacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaPrivacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
