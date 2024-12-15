import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatDemandeComponent } from './etat-demande.component';

describe('EtatDemandeComponent', () => {
  let component: EtatDemandeComponent;
  let fixture: ComponentFixture<EtatDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
