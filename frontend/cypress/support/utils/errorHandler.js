const errorHandler = () =>
	cy.on(`uncaught:exception`, () => {
		return false
	})
export default errorHandler
