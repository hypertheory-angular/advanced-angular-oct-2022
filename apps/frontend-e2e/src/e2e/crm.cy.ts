describe('The Data CRM Feature', () => {
  describe('The Happy Path', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://api.mycrmsitedotcom.com/customers', {
        fixture: 'employees-full.json'
      });
      cy.visit('/data/crm');
    });
    it('loads', () => {
      // left intentionally blank.
    });
  });
});
