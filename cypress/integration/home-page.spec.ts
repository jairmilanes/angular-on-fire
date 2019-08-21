/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl') || '')
    })

    it('It should contain a jumbotron', () => {
        cy.get('.aof-jumbotron').should(
            'have.attr',
            'href',
            'https://github.com/layoutzweb/angular-on-fire'
        )
        cy.get('.aof-main-action').should(
            'have.attr',
            'href',
            'https://github.com/layoutzweb/angular-on-fire'
        )
    })
})
