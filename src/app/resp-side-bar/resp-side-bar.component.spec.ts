import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespSideBarComponent } from './resp-side-bar.component';

describe('RespSideBarComponent', () => {
  let component: RespSideBarComponent;
  let fixture: ComponentFixture<RespSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
