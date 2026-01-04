describe('Login Test cases', () => {
  beforeEach(() => {
    cy.visit('https://test.onemedtest.com/login')
  })
  it('Validate that a user can login with valid email address and password', () => {
      cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field').type('admin@example.com')
      cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field').type('password')
      cy.get('.LoginCredentialsForm__submit').click()
      cy.contains('Hope Hospital, Doha').click()
  })

  it('Validate that a user gets an error when they login with a valid email address and an invalid password', () => {
      cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field').type('admin@example.com')
      cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field').type('testpassword')
      cy.get('.LoginCredentialsForm__submit').click()
      cy.contains(' Invalid email/phone no or password.').should('be.visible')
  })

  it('Validate that a user gets an error when they login with an invalid email address and valid password', () => {
      cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field').type('testemail@gmail.com')
      cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field').type('password')
      cy.get('.LoginCredentialsForm__submit').click()
      cy.contains(' Invalid email/phone no or password.').should('be.visible')
})

  it('Validate that a user cannot login with empty email address and password fields', () => {
      cy.get(':nth-child(1) > .AlmightyInput > .AlmightyInput__field')
      cy.get(':nth-child(2) > .AlmightyInput > .AlmightyInput__field')
      cy.get('button[type="submit"]').should('be.disabled')
})

})