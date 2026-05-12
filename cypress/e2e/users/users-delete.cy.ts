describe('Users Delete', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users-list');

    cy.login();

    cy.wait('@get-users-list');
  });

  it('Should select user, open dialog, delete successfully and fetch updated list', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {}).as('get-users-delete');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-delete.json',
    }).as('get-users-list-user-delete');

    cy.get('tbody > tr > td.mat-column-first_name').should('contain.text', 'Novo');

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=delete-user]').click();
      });

    cy.get('form').within(() => {
      cy.get('[data-testid=delete-title]').should(
        'contain.text',
        'Deseja deletar o usuário Novo Usuário?',
      );
      cy.get('button').contains('Confirmar').click();
    });

    cy.wait('@get-users-delete');

    cy.get('simple-snack-bar').should('contain.text', 'Usuário deletado com sucesso.');

    cy.wait('@get-users-list-user-delete');

    cy.get('app-delete-dialog').should('not.exist');

    cy.get('tbody > tr > td.mat-column-first_name').should('contain.text', 'Outro');
  });

  it('Should select user, open dialog and get error when delete', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {
      statusCode: 500,
    }).as('get-users-delete');

    cy.get('[data-testid=users-list-result]')
      .find('tbody')
      .within(() => {
        cy.get('tr').eq(0).find('[data-testid=delete-user]').click();
      });

    cy.get('form').within(() => {
      cy.get('[data-testid=delete-title]').should(
        'contain.text',
        'Deseja deletar o usuário Novo Usuário?',
      );
      cy.get('button').contains('Confirmar').click();
    });

    cy.wait('@get-users-delete');

    cy.get('simple-snack-bar').should('contain.text', 'Erro ao deletar usuário.');
  });
});
