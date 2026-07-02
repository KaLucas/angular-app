import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginDialog } from './register-login-dialog';

describe('RegisterLoginDialog', () => {
  let component: RegisterLoginDialog;
  let fixture: ComponentFixture<RegisterLoginDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoginDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterLoginDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
