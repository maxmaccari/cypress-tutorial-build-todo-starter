describe('Footer', () => {
  context('with a single todo', () => {
    it('displays a singular todo in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Buy milk', isComplete: false}])

      cy.get('.todo-count')
        .should('contain', '1 todo left')
    })
  })

  context('with multiples todos', () => {
    beforeEach(() => {
      cy.seedAndVisit()
    })

    it('displays in plural todos in count', () => {
      cy.get('.todo-count')
        .should('contain', '3 todos left')
    })

    it('Filters to active todos', () => {
      cy.contains('Active')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 3)
    })

    it('Handles filter links', () => {
      const filters = [
        { link: 'Active', expectedLength: 3 },
        { link: 'Completed', expectedLength: 1 },
        { link: 'All', expectedLength: 4 }
      ]

      cy.wrap(filters)
        .each(filter => {
          cy.contains(filter.link)
            .click()

          cy.get('.todo-list li')
            .should('have.length', filter.expectedLength)
        })
    })
  })
})