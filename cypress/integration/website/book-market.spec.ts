describe('Book market', () => {
  describe('Home', () => {
    it('displays categories', () => {
      cy.visit('/book-market/');

      cy.contains('Psychology').should('exist');
    });

    it('gets books for category', () => {
      cy.visit('/book-market/');

      cy.contains('Psychology').click();

      cy.url().should('contain', '/book-market/section/psychology');

      cy.get('.ListingList__item').should('exist');
    });
  });
});
