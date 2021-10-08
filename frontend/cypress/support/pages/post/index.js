export const postNavigation = (data) => cy.get(`a`).contains(data).click()
