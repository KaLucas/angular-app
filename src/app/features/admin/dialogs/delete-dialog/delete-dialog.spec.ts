import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog';

const mockUser = {
  id: '1',
  data: {
    first_name: 'Karina',
    last_name: 'Lucas',
    email: 'karina@email.com',
  },
};

describe('DeleteDialog', () => {
  let component: DeleteDialog;
  let fixture: ComponentFixture<DeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockUser,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display user name on dialog title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dialogTitle = compiled.querySelector('[data-testid="delete-title"]');

    expect(dialogTitle).toBeTruthy();
    expect((dialogTitle as HTMLElement).textContent).toContain(mockUser.data.first_name);
    expect((dialogTitle as HTMLElement).textContent).toContain(mockUser.data.last_name);
  });
});
