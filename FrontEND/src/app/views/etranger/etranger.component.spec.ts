import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtrangerComponent } from './etranger.component';

describe('EtrangerComponent', () => {
  let component: EtrangerComponent;
  let fixture: ComponentFixture<EtrangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtrangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtrangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
