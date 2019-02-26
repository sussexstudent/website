describe('CookieMessage', () => {
  it('displays on load', () => {
    cy.clearLocalStorage();
    cy.visit('/');

    cy.contains('This site uses cookies.')
      .should('exist')
      .contains('Close')
      .click();

    cy.contains('This site uses cookies.').should('not.exist');

    cy.reload();

    cy.contains('This site uses cookies.').should('not.exist');
  });
});
