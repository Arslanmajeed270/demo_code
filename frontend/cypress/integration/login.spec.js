import * as validUser from '../fixtures/registeration/validRegister.json'
import * as invalidUser from '../fixtures/registeration/invalidRegister.json'
import { deletUser, registerUser } from '../support/entities'
const commonLocale = require(`../../locales/en-US/common.json`)

describe(`Login Page - Validating Form Fields`, () => {
	beforeEach(() => {
		cy.visit(`/login`)
	})

	it(`Should redirect to Login Page, if user is not logged in`, () => {
		cy.visit(`/`)
		cy.location(`pathname`).should(`eq`, `/login`)
	})

	it(`Should return error '${commonLocale[`invalid-email-error`]}'`, () => {
		cy.loginTestUser(invalidUser.email, validUser.password)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`invalid-email-error`],
		)
	})
	it(`Should return error '${commonLocale[`password-length-error`]}'`, () => {
		cy.loginTestUser(validUser.email, invalidUser.minLengthpassword)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`password-length-error`],
		)
	})
	it(`Test with wrong email, Should return error '${
		commonLocale[`wrong-password`]
	}'`, () => {
		cy.loginTestUser(invalidUser.wrongEmail, validUser.password)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`wrong-password`],
		)
	})

	it(`Test with wrong password, Should return error '${
		commonLocale[`wrong-password`]
	}'`, () => {
		cy.loginTestUser(validUser.email, invalidUser.wrongPassword)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`wrong-password`],
		)
	})

	it(`Successfully log in User`, () => {
		cy.request(registerUser(validUser))
		cy.loginTestUser(validUser.email, validUser.password)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`login-successful`],
		)
		cy.location(`pathname`).should(`eq`, `/dashboard`)
		cy.visit(`/login`)
		cy.location(`pathname`).should(`eq`, `/dashboard`)
		cy.request(deletUser(validUser.email)).should((res) => {
			expect(res.body.data.deleteTestUser.message).to.eq(
				commonLocale[`delete-successful`],
			)
		})
	})
})
