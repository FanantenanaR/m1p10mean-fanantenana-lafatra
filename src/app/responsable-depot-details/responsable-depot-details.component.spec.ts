import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableDepotDetailsComponent } from './responsable-depot-details.component';

describe('ResponsableDepotDetailsComponent', () => {
  let component: ResponsableDepotDetailsComponent;
  let fixture: ComponentFixture<ResponsableDepotDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableDepotDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableDepotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
