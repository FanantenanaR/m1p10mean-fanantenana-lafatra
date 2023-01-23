import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginresponsableComponent } from './loginresponsable.component';

describe('LoginresponsableComponent', () => {
  let component: LoginresponsableComponent;
  let fixture: ComponentFixture<LoginresponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginresponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginresponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
