describe('The Data CRM Feature', () => {
  describe.only('The Happy Path', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://api.mycrmsitedotcom.com/customers', {
        fixture: 'employees-full.json',
      });
      cy.visit('/data/crm');
    });
    it('loads', () => {
      // left intentionally blank.
    });
  });

  describe('No Data From The Api', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://api.mycrmsitedotcom.com/customers', {
        body: {
          data: [],
        },
      });
      cy.visit('/data/crm');
    });
    it('loads', () => {
      // left intentionally blank.
    });
  });

  describe('Error Response from The Api', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://api.mycrmsitedotcom.com/customers', {
        statusCode: 400,
      });
      cy.visit('/data/crm');
    });
    it('loads', () => {
      // left intentionally blank.
    });
  });
});
