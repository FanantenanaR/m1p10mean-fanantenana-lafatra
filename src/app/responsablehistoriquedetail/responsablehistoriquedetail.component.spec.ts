import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablehistoriquedetailComponent } from './responsablehistoriquedetail.component';

describe('ResponsablehistoriquedetailComponent', () => {
  let component: ResponsablehistoriquedetailComponent;
  let fixture: ComponentFixture<ResponsablehistoriquedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablehistoriquedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablehistoriquedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
