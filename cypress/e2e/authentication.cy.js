describe('authentication', () => {
  beforeEach(() =>  {
    cy.visit('http://localhost:5173/');
  })
  it('should sign up successfully', () => {
    cy.get('body').should('not.contain', 'You have successfully signed in!');
    cy.getDataTest('email-input').type('test@example.com');
    cy.getDataTest('password-input').type('password123');
    cy.getDataTest('submit-button').click();
    cy.get('body').should('contain.text', 'You have successfully signed in!');
  })
  it('should not sign up with the same email', () => {
    cy.get('body').should('not.contain', 'You have already signed up with this mail!');
    cy.getDataTest('email-input').type('test@example.com'); 
    cy.getDataTest('password-input').type('password123');
    cy.getDataTest('submit-button').click();
    cy.get('body').should('contain.text', 'You have already signed up with this mail!');
  });
})
