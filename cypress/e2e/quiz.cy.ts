describe('Tech Quiz Application - E2E', () => {
    beforeEach(() => {
      // Intercept the API request to ensure consistent results
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: [
          {
            question: "What is React?",
            answers: [
              { text: "A library", isCorrect: true },
              { text: "A framework", isCorrect: false },
              { text: "A runtime", isCorrect: false },
              { text: "A language", isCorrect: false },
            ],
          },
          {
            question: "What is Node.js?",
            answers: [
              { text: "A runtime", isCorrect: true },
              { text: "A framework", isCorrect: false },
              { text: "A library", isCorrect: false },
              { text: "A language", isCorrect: false },
            ],
          },
        ],
      }).as('getQuestions');
    });
  
    it('should complete a quiz and display the correct score', () => {
      // Visit the application
      cy.visit('/');
  
      // Start the quiz
      cy.get('button').contains('Start Quiz').click();
      cy.wait('@getQuestions');
  
      // Answer the first question
      cy.get('.btn-primary').contains('A library').click();
      cy.get('h2').should('contain', 'What is Node.js?');
  
      // Answer the second question
      cy.get('.btn-primary').contains('A runtime').click();
  
      // Verify the quiz completion
      cy.get('.card').contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').should('contain', 'Your score: 2/2');
    });
  });