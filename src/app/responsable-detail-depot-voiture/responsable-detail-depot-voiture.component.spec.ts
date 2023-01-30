import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableDetailDepotVoitureComponent } from './responsable-detail-depot-voiture.component';

describe('ResponsableDetailDepotVoitureComponent', () => {
  let component: ResponsableDetailDepotVoitureComponent;
  let fixture: ComponentFixture<ResponsableDetailDepotVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableDetailDepotVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableDetailDepotVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
