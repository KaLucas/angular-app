describe('Users Edit', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.login();

    cy.wait('@get-users-list');
  });

  it('Should select user, open dialog, edit successfully and fetch updated list', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      fixture: 'users-edit.json',
    }).as('get-users-edit');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-updated.json',
    }).as('get-users-list-updated');

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=edit-user]').click();
      });

    cy.get('h2').should('contain.text', 'Editar usuário');

    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('{backspace}a');
      cy.get('button').contains('Salvar').click();
    });

    cy.wait('@get-users-edit');

    cy.get('mat-dialog-container').should('not.exist');

    cy.get('simple-snack-bar').should('contain.text', 'Usuário salvo com sucesso.');

    cy.wait('@get-users-list-updated');

    cy.get('tbody > tr > td.mat-column-first_name').should('contain.text', 'Nova');
  });

  it('Should select user, open dialog, edit and get error', () => {
    cy.intercept('PUT', '**/collections/users/records/*', {
      statusCode: 500,
    }).as('get-users-edit');

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=edit-user]').click();
      });

    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('{backspace}a');
      cy.get('button').contains('Salvar').click();
    });

    cy.wait('@get-users-edit');

    cy.get('simple-snack-bar').should('contain.text', 'Erro ao salvar usuário.');
  });
});
