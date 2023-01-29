import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablehistoriquereparationComponent } from './responsablehistoriquereparation.component';

describe('ResponsablehistoriquereparationComponent', () => {
  let component: ResponsablehistoriquereparationComponent;
  let fixture: ComponentFixture<ResponsablehistoriquereparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablehistoriquereparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablehistoriquereparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
