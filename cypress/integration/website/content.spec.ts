describe('Content', () => {
  describe('Knowledge Bases', () => {
    it('displays root page', () => {
      cy.visit('/services/staff/');

      cy.contains('Internal Knowledge Base').should('exist');
    });

    it('displays reference page', () => {
      cy.visit('/services/staff/content/using-outlets-template/');

      cy.contains('Navigation').should('exist');
    });
  });
});
