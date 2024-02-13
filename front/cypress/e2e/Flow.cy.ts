 // @ts-nocheck

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.get('.align-middle').click().wait(2000)
    cy.get('.align-middle').click()
    cy.get('[role="dialog"]').should('be.visible')
  })
})