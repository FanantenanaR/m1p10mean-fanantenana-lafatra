import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsabledepotComponent } from './responsabledepot.component';

describe('ResponsabledepotComponent', () => {
  let component: ResponsabledepotComponent;
  let fixture: ComponentFixture<ResponsabledepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsabledepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsabledepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
