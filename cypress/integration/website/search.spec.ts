describe('Search', () => {
  it('searches on homepage', () => {
    cy.visit('/');

    // single letter due to https://github.com/cypress-io/cypress/issues/2240
    cy.get('.HomepageSplash__search-input').type('c');

    cy.url().should('contain', '/search?q=c');

    cy.focused().should('have.id', 'HP_QUERY_ELEMENT_SIDE_EFFECT');
  });

  it('searches via search bar', () => {
    cy.visit('/');

    cy.get('#HP_QUERY_ELEMENT_SIDE_EFFECT').type('comedy');

    cy.url().should('contain', '/search?q=comedy');
  });
});
