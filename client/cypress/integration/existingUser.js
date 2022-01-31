describe('existing user flow', function () {
    it('logs in, creates a post, logs out', function () {
        cy.viewport(1512, 865);

        cy.visit('http://localhost:3000/');

        cy.get('#root > .ui > .ui > .right > .item:nth-child(1)').click();

        cy.get('.ui > .field:nth-child(2) > .field > .ui > input').click();

        cy.get('.ui > .field:nth-child(2) > .field > .ui > input').type(
            'valentin'
        );

        cy.get('.ui > .field:nth-child(3) > .field > .ui > input').type(
            'password'
        );

        cy.get('.primary').click();

        cy.wait(1000);

        cy.get('input').type('This is a test post from cypress');

        cy.get(':nth-child(2) > .teal').click();

        cy.wait(1000);

        cy.get('#root > .ui > .ui > .right > .item').click();
    });
});
