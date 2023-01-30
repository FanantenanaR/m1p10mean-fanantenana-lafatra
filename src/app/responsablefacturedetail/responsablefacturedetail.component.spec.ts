import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablefacturedetailComponent } from './responsablefacturedetail.component';

describe('ResponsablefacturedetailComponent', () => {
  let component: ResponsablefacturedetailComponent;
  let fixture: ComponentFixture<ResponsablefacturedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsablefacturedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablefacturedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
