describe('Users List', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.login();

    cy.wait('@get-users-list');
  });

  it('Should list users', () => {
    cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0);
    cy.get('tbody > tr > td.mat-column-first_name').should('contain.text', 'Novo');
    cy.get('tbody > tr > td.mat-column-last_name').should('contain.text', 'Usuário');
    cy.get('tbody > tr > td.mat-column-email').should('contain.text', 'novo@email.com');
  });

  it('Should change to page 2 and list users', () => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-page-2.json',
    }).as('get-users-list2');

    cy.get('[data-testid=users-list-result]').should('have.length.greaterThan', 0);
    cy.get('button[aria-label="Next page"]').click();

    cy.wait('@get-users-list2');

    cy.get('tbody > tr > td.mat-column-first_name').should('contain.text', 'Dawn');
    cy.get('tbody > tr > td.mat-column-last_name').should('contain.text', 'Summers');
    cy.get('tbody > tr > td.mat-column-email').should('contain.text', 'dawn.summers@sunnydale.com');
  });
});
