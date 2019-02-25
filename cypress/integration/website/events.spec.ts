describe('Events', () => {
  describe('Detail Page', () => {
    it('displays event detail', () => {
      cy.visit(
        '/whats-on/students-union-election-hustings-meet-the-candidat-2509',
      );

      cy.contains(
        "Students' Union Election hustings: Meet the candidate",
      ).should('exist');

      cy.contains('Student Life').should('exist');
    });

    it('displays image for event with image', () => {
      cy.visit(
        '/whats-on/students-union-election-hustings-meet-the-candidat-2509',
      );

      cy.get('.EventDetail--customImage').should('exist');
    });

    it('displays pattern for event without image', () => {
      cy.visit('/whats-on/cocktail-night-go-green-week-2497');

      cy.get('.EventDetail--customImage').should('not.exist');
    });
  });

  describe('Listings', () => {
    it('displays event detail', () => {
      cy.visit('/whats-on');

      cy.get('.EventsCalender__item').should('exist');
    });
  });
});
