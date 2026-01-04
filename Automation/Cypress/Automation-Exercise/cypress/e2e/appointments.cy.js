describe('Appointment Test cases', () => {

  // -------------- FUNCTIONS ----------------

  // Function for login
    const logIn = () => {
      cy.visit('https://test.onemedtest.com/login')
      cy.get('[placeholder="Your Phone Number or Email"]').type('admin@example.com')
      cy.get('[placeholder="Your Password"]').type('password')
      cy.get('.LoginCredentialsForm__submit').click()
      cy.contains('Hope Hospital, Doha').click()
    }

  // Function to enter details of a new patient
    const collectPatientDetails = (firstName, lastName, gender, phoneNumber, emailAddress) => {
      cy.get('[placeholder="First Name"]').type(firstName)
      cy.get('[placeholder="Last Name"]').type(lastName)
      cy.contains('span', gender).click()
      cy.get('[placeholder="Enter a phone number"]').type(phoneNumber)
      cy.get('[placeholder="email@example.com"]').type(emailAddress)
    }

  // Function to select team
    const selectTeam = (teamName) => {
      cy.contains('span', 'Team').click()
      cy.get('.DetailsFields > [for="teams"] > .multiselect > .multiselect__tags').click()
      cy.get('.multiselect__content').contains(teamName).click()
   }

  // Function to select clinic and visit reason
  const selectMultiselectOption = (forAttribute, option) => {
    cy.get(`[for="${forAttribute}"] > .multiselect > .multiselect__tags`).click()
    cy.get('div.AlmightyDropdown__option--main' ).contains('span', option).click({force: true})
  }

  // Function to select date and time for an appointment
  const selectDateTime = (time) => {
    cy.get('[placeholder="Select date"]').click()
    cy.get('[class="cell day highlighted today"]').click({ force: true })
    cy.contains('button', 'Confirm').click()
    cy.get('[placeholder="Select Time"]').click({ force: true })
    cy.get('div.AlmightyTimeDropdown__option').contains(time).click()
  }

  // Function for confirm button when creating or rescheduling appointment
  const confirmAppointmentButton = () => {
    cy.get('[data-cy="FullPageModalActions__submit"]').contains('Confirm').click()
  }

  // Function to select which appointment to reschedule or cancel
  const rescheduleOrCancelAppointment = (appointmentOrder) => {
    cy.get('[data-cy="CalendarToolbarViewsActions__button-list"]').contains('List').click({ force: true })
    cy.get(`tr:nth-of-type(${appointmentOrder}) > .listWeek__row > .listWeek__event.listWeek__event--highlighted > .listWeek__event-button`).click({ force: true })
  }  


  // ---------------- TEST CASES BEGIN HERE -----------------------
  // Opening the Appointments module
    beforeEach(() => {
      logIn()
      cy.contains('span','Appointments').click()
    })

    it.only('Validate that a user can create an appointment for a new patient', () => {
      cy.contains('button', '+ Add Appointment').click()
      cy.contains('span','New Patient').click()
      collectPatientDetails('Susan', 'Ewele', 'Female', '07078656453', 'susanewele@gmail.com')
      selectTeam('Lab')
      selectDateTime('02:45 PM')
      selectMultiselectOption('clinic', 'Clinic with required referral')
      selectMultiselectOption('appointmentReasons', 'Wellness Exam')
      confirmAppointmentButton()  
  })

    it('Validate that a user can create an appointment for a registered patient', () => {
      cy.contains('button', '+ Add Appointment').click()
      cy.contains('span', 'Registered').click()
      cy.get('[placeholder="Select Patient"]').click({force: true})
      cy.contains('span', 'Chimezie Obi').click()
      selectTeam('Lab')
      selectDateTime('03:00 PM')
      selectMultiselectOption('clinic', 'Dermatology')
      selectMultiselectOption('appointmentReasons', 'Urgent Visit')
      confirmAppointmentButton()
  })

    it('Validate that a user can reschedule an appointment', () => {
      rescheduleOrCancelAppointment('9')
      cy.contains('button', 'Reschedule Appointment').click()
      cy.get('div.AlmightyDropdown__option--main' ).contains('span', 'Post-Op').click({force: true})
      confirmAppointmentButton()
    })

    it('Validate that a user can cancel an appointment', () => {
      rescheduleOrCancelAppointment('9')
      cy.contains('button', 'Cancel Appointment').click()
      cy.get('.AppointmentCancel__button-cancel').click()
    })

})