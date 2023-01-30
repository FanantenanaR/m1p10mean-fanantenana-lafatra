import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablefactureComponent } from './responsablefacture.component';

describe('ResponsablefactureComponent', () => {
  let component: ResponsablefactureComponent;
  let fixture: ComponentFixture<ResponsablefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablefactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
