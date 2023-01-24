import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientinscriptionComponent } from './clientinscription.component';

describe('ClientinscriptionComponent', () => {
  let component: ClientinscriptionComponent;
  let fixture: ComponentFixture<ClientinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientinscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
