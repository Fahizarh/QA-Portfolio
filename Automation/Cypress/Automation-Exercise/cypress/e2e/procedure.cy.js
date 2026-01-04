describe('Procedure Test Cases', () => {
    beforeEach(() => {
        cy.visit('https://test.onemedtest.com/login')
      })

    
    it('Validate that a user can add a new procedure', () => {
        // Get the email address input
        cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field').type('admin@example.com')

        // Get the password input
        cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field').type('password')

        // Get the sign in button
        cy.get('.LoginCredentialsForm__submit').click()
        cy.contains('Hope Hospital, Doha').click()

        // Get the procedure button
        cy.contains('Procedures').click()

        // Get the add procedure link
        cy.contains('+ Add new Procedure').click()

        // Get the patient name input
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(1) > label > div > div.multiselect__select').click()
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(1) > label > div > div.multiselect__content-wrapper > ul > li:nth-child(1)').click()
        
        // Get the category input
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(2) > div > label > div > div.multiselect__select').click()
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(2) > div > label > div > div.multiselect__content-wrapper > ul > li:nth-child(1)').click()
        
        // Get the procedure name input
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(3) > div > label > div > div.multiselect__select').click()
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(3) > div > label > div > div.multiselect__content-wrapper > ul > li:nth-child(1)').click()

        // Get the diagnosis input
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(4) > label > div > div.multiselect__select').click()
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(4) > label > div > div.multiselect__content-wrapper > ul > li:nth-child(2)').click()

        // Get the resource input
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(5) > label > div > div.multiselect__select').click()
        cy.get('#portal > div > div > div > section > div > form > div:nth-child(5) > label > div > div.multiselect__content-wrapper > ul > li:nth-child(2)').click()

        // Get the create button
        cy.get('.CreateEditProcedureForm__button').click()
        
    })
})