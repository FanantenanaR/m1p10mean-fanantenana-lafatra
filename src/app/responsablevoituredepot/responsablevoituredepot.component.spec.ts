import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablevoituredepotComponent } from './responsablevoituredepot.component';

describe('ResponsablevoituredepotComponent', () => {
  let component: ResponsablevoituredepotComponent;
  let fixture: ComponentFixture<ResponsablevoituredepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablevoituredepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablevoituredepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
