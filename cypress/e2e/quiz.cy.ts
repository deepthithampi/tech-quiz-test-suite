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
    // cy.wait('@getQuestions').then((interception) => {
    //     expect(interception.response).to.exist;
    //     if (interception.response) {
    //       expect(interception.response.body).to.exist;
    //       expect(interception.response.body[0].answers[0].text).to.eq('A library');
    //     }
        
    //   });
    //   cy.get('.btn-primary').then(($btns) => {
    //     $btns.each((index, btn) => {
    //       console.log(`Button ${index}: ${btn.textContent}`);
    //     });
    //   });
    cy.get('h2').should('contain', 'What is React?');
    cy.get('.btn-primary').should('have.length', 4); // Check buttons count
    cy.get('.btn-primary').contains('A library', { timeout: 10000 }).should('be.visible').click();
  
        // Verify the second question
      cy.get('h2').should('contain', 'What is Node.js?');
      cy.get('.btn-primary').contains('A runtime').click();
  
      // Verify the quiz completion
      cy.get('.card').contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').should('contain', 'Your score: 2/2');
    });
  });