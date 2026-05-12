import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormDialog } from '../user-form-dialog/user-form-dialog';

const mockDialogRef = { close: vi.fn() };

const mockUser = {
  id: '1',
  data: {
    first_name: 'Karina',
    last_name: 'Lucas',
    email: 'karina@email.com',
  },
};

describe('UserFormDialog', () => {
  describe('Create user', () => {
    let component: UserFormDialog;
    let fixture: ComponentFixture<UserFormDialog>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserFormDialog],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: null },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UserFormDialog);
      component = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('Should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should have empty form', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const inputFirstName = compiled.querySelector('input[data-testid="input-first-name"]');
      const inputLastName = compiled.querySelector('input[data-testid="input-last-name"]');
      const inputEmail = compiled.querySelector('input[data-testid="input-email"]');

      expect(inputFirstName).toBeTruthy();

      expect((inputFirstName as HTMLInputElement).value).toBe('');
      expect((inputLastName as HTMLInputElement).value).toBe('');
      expect((inputEmail as HTMLInputElement).value).toBe('');
    });
  });

  describe('edit user', () => {
    let component: UserFormDialog;
    let fixture: ComponentFixture<UserFormDialog>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [UserFormDialog],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: mockUser },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UserFormDialog);
      component = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('Should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should populate form with user data', () => {
      const compiled = fixture.nativeElement as HTMLElement;

      const inputFirstName = compiled.querySelector('input[data-testid="input-first-name"]');
      const inputLastName = compiled.querySelector('input[data-testid="input-last-name"]');
      const inputEmail = compiled.querySelector('input[data-testid="input-email"]');

      expect(inputFirstName).toBeTruthy();
      expect((inputFirstName as HTMLInputElement).value).toBe(mockUser.data.first_name);
      expect((inputLastName as HTMLInputElement).value).toBe(mockUser.data.last_name);
      expect((inputEmail as HTMLInputElement).value).toBe(mockUser.data.email);
    });
  });
});
