describe('Sidebar', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Should display sidebar data', () => {
    cy.get('[data-testid=sidebar-component]').should('be.visible');

    cy.get('[data-testid=user-summary-card]').should('be.visible');
    cy.get('[data-testid=logout-button]').should('exist');
  });

  it('Should logout', () => {
    cy.get('[data-testid=sidebar-component]').should('be.visible');

    cy.get('[data-testid=logout-button]').should('exist').click();
    cy.url().should('include', '/admin');
  });
});
