describe('Login', () => {
  it('Should login successfully', () => {
    cy.visit('/admin');

    cy.get('[data-testid=login-email]').type('admin@email.com');
    cy.get('[data-testid=login-password]').type('123456');
    cy.get('[data-testid=login-button]').click();

    cy.url().should('include', '/admin/dashboard');
    cy.get('h2').contains('Lista de Usuários').should('be.visible');
  });

  it.only('Should show error on invalid login', () => {
    cy.visit('/admin');

    cy.get('[data-testid=login-email]').type('teste@email.com');
    cy.get('[data-testid=login-password]').type('2345');
    cy.get('[data-testid=login-button]').click();

    cy.get('simple-snack-bar').contains('E-mail ou senha inválidos.').should('be.visible');
  });
});
