import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespListeDepotComponent } from './resp-liste-depot.component';

describe('RespListeDepotComponent', () => {
  let component: RespListeDepotComponent;
  let fixture: ComponentFixture<RespListeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespListeDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespListeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
