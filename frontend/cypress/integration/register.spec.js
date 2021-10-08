import * as validUser from '../fixtures/registeration/validRegister.json'
import * as invalidUser from '../fixtures/registeration/invalidRegister.json'
import { deletUser } from '../support/entities'
const commonLocale = require(`../../locales/en-US/common.json`)

describe(`Register Page - Validating form fields`, () => {
	beforeEach(() => {
		cy.visit(`/register`)
	})

	it(`Should return error '${
		commonLocale[`firstname-length-error`]
	}'`, () => {
		cy.registerTestUser({ ...validUser, firstName: invalidUser.firstName })
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`firstname-length-error`],
		)
		cy.request(deletUser(validUser.email))
	})

	it(`Should return error '${commonLocale[`lastname-length-error`]}'`, () => {
		cy.registerTestUser({ ...validUser, lastName: invalidUser.lastName })
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`lastname-length-error`],
		)
		cy.request(deletUser(validUser.email))
	})

	it(`Should return error '${commonLocale[`invalid-email-error`]}'`, () => {
		cy.registerTestUser({ ...validUser, email: invalidUser.email })
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`invalid-email-error`],
		)
		cy.request(deletUser(validUser.email))
	})

	it(`Should return error '${commonLocale[`password-length-error`]}'`, () => {
		cy.registerTestUser({
			...validUser,
			password: invalidUser.minLengthpassword,
		})
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`password-length-error`],
		)
		cy.request(deletUser(validUser.email))
	})

	it(`Should register the user`, () => {
		cy.registerTestUser(validUser)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`registered-successful`],
		)
		cy.location(`pathname`).should(`eq`, `/dashboard`)
		cy.visit(`/login`)
		cy.location(`pathname`).should(`eq`, `/dashboard`)
		cy.request(deletUser(validUser.email))
	})

	it(`Should return error '${commonLocale[`user-exists`]}'`, () => {
		cy.registerTestUser(validUser)
		cy.location(`pathname`).should(`eq`, `/dashboard`)
		cy.logoutTestUser()
		cy.visit(`/register`)
		cy.registerTestUser(validUser)
		cy.get(`[data-testid=notification]`).contains(
			commonLocale[`user-exists`],
		)
		cy.request(deletUser(validUser.email))
	})
})
