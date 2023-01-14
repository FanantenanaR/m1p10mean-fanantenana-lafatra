import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableaccueilComponent } from './responsableaccueil.component';

describe('ResponsableaccueilComponent', () => {
  let component: ResponsableaccueilComponent;
  let fixture: ComponentFixture<ResponsableaccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableaccueilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableaccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
