import { mutations } from './auth'

export const deletUser = (email) => {
	const { BACKEND_URL } = Cypress.env()
	return {
		url: `${BACKEND_URL}/graphql`,
		method: `POST`,
		body: { query: mutations.deleteTestUser(email) },
	}
}

export const registerUser = (validUser) => {
	const { BACKEND_URL } = Cypress.env()
	return {
		url: `${BACKEND_URL}/graphql`,
		method: `POST`,
		body: { query: mutations.registerTestUser(validUser) },
	}
}
