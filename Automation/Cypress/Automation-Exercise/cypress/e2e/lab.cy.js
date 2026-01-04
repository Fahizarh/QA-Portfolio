describe('Lab Test cases', () => {
    beforeEach(() => {
      cy.visit('https://test.onemedtest.com')
      cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field').type('admin@example.com')
      cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field').type('password')
      cy.get('.LoginCredentialsForm__submit').click()
      cy.contains('Hope Hospital, Doha').click()
      cy.contains('Lab').click()
    })

    it('Validate that a user can take a specimen', () => {
      cy.get('.filter-undisbursed > label > .RadioContentFilter__item__label').click()
      cy.contains('Awaiting Specimen').click()
      cy.get('.btn-default').click()
      cy.get('#ui-select-choices-row-0-2 > .ui-select-choices-row-inner').click()
      cy.get('.LabOrder__footer-right > .submit-btn').click()
  })

    it.only('Validate that a user can receive a specimen', () => {
      cy.get('.filter-undisbursed > label > .RadioContentFilter__item__label').click()
      cy.contains('Specimen Taken').click()
      cy.get('.LabOrder__footer__submit').click()
  })

    it('Validate that a user can reject a specimen', () => {
      cy.get('.filter-undisbursed > label > .RadioContentFilter__item__label').click()
      cy.contains('Specimen Taken').click()
      cy.get('.LabOrder__reject').click()
      cy.get('#reason').type('Specimen is contaminated')
      cy.get('.RejectLabOrderModal__actions > .submit-btn').click()
})

    it('Validate that a user can submit a lab result', () => {
      cy.get('.filter-undisbursed > label > .RadioContentFilter__item__label').click()
      cy.contains('No Results Submitted').click()
      cy.get('.Grid-column-3 > .field').type('237GT')
      // cy.get('.field LabOrder__tests__item__row__value--number-input ng-pristine ng-untouched ng-valid ng-scope ng-not-empty').type('12')
      // cy.get('.submit-btn submit-btn LabOrder__footer__submit ladda-button').click()
      
})

})