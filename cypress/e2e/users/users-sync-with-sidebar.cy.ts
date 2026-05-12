describe('Users sync with sidebar', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list.json',
    }).as('get-users');

    cy.login();

    cy.wait('@get-users');
  });

  it('Should update sidebar count after creating user', () => {
    cy.intercept('POST', '**/collections/users/records*', {
      body: {
        data: {
          first_name: 'New',
          last_name: 'User',
          email: 'email@email.com',
        },
      },
    }).as('create-user');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-created.json',
    }).as('get-users-created');

    cy.get('[data-testid=sidebar-count]').should('contain.text', '11');

    cy.get('[data-testid=create-user]').click();

    cy.get('form').within(() => {
      cy.get('[data-testid=input-first-name]').type('New');
      cy.get('[data-testid=input-last-name]').type('User');
      cy.get('[data-testid=input-email]').type('email@email.com');
      cy.contains('button', 'Criar').click();
    });

    cy.wait('@create-user');
    cy.wait('@get-users-created');

    cy.get('[data-testid=sidebar-count]').should('contain.text', '12');
  });

  it('Should update sidebar count after deleting user', () => {
    cy.intercept('DELETE', '**/collections/users/records/*', {}).as('get-users-delete');

    cy.intercept('GET', '**/collections/users/records*', {
      fixture: 'users-list-user-delete.json',
    }).as('get-users-created');

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

    cy.get('[data-testid=sidebar-count]').should('contain.text', '10');
  });
});
