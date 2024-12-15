import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitoyenMarocainComponent } from './citoyen-marocain.component';

describe('CitoyenMarocainComponent', () => {
  let component: CitoyenMarocainComponent;
  let fixture: ComponentFixture<CitoyenMarocainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitoyenMarocainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitoyenMarocainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
