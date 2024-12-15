import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenouvellementComponent } from './renouvellement.component';

describe('RenouvellementComponent', () => {
  let component: RenouvellementComponent;
  let fixture: ComponentFixture<RenouvellementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenouvellementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenouvellementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
