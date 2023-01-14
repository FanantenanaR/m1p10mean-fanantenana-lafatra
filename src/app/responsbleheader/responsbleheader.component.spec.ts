import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsbleheaderComponent } from './responsbleheader.component';

describe('ResponsbleheaderComponent', () => {
  let component: ResponsbleheaderComponent;
  let fixture: ComponentFixture<ResponsbleheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsbleheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsbleheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
