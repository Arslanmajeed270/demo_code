//for registeration
Cypress.Commands.add(`registerTestUser`, (testUser) => {
	cy.get(`[data-testid=firstName]`).type(testUser.firstName)
	cy.get(`[data-testid=lastName]`).type(testUser.lastName)
	cy.get(`[data-testid=email]`).type(testUser.email)
	cy.get(`[data-testid=password]`).type(testUser.password)
	cy.get(`[data-testid=registerForm]`).submit()
})

Cypress.Commands.add(`resetRegisterForm`, () => {
	cy.get(`[data-testid=firstName]`).clear()
	cy.get(`[data-testid=lastName]`).clear()
	cy.get(`[data-testid=email]`).clear()
	cy.get(`[data-testid=password]`).clear()
})

//for login
Cypress.Commands.add(`loginTestUser`, (email, password) => {
	cy.get(`[data-testid=email]`).type(email)
	cy.get(`[data-testid=password]`).type(password)
	cy.get(`[data-testid=loginUser]`).submit()
})

//for logout
Cypress.Commands.add(`logoutTestUser`, () => {
	cy.get(`[data-testid=userProfile]`).click()
	cy.get(`[data-testid=logoutUser]`).click()
})
