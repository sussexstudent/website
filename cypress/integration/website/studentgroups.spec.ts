describe('Student Groups', () => {
  describe('Discover', () => {
    it('displays student groups', () => {
      cy.visit('/sport-societies-media/discover/');

      cy.get('.OrganisationCard__link').should('exist');
    });

    it('searches for student groups', () => {
      cy.visit('/sport-societies-media/discover/');

      cy.get('.ActivitiesApp__search-input').type('hack sussex');

      cy.get('.OrganisationCard__title:first').should(
        'have.text',
        'HackSussex',
      );

      cy.get('.OrganisationCard__link:first')
        .should('have.attr', 'href')
        .and('include', '/organisation/susstech/');
    });
  });
});
