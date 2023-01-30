import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientfactureComponent } from './clientfacture.component';

describe('ClientfactureComponent', () => {
  let component: ClientfactureComponent;
  let fixture: ComponentFixture<ClientfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
