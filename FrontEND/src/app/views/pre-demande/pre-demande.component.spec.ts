import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDemandeComponent } from './pre-demande.component';

describe('PreDemandeComponent', () => {
  let component: PreDemandeComponent;
  let fixture: ComponentFixture<PreDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
