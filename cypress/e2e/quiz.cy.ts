

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
    //   cy.wait('@getQuestions');
  
    cy.wait('@getQuestions').then((interception) => {

        expect(interception.response!.body).to.exist;
        if (interception.response) {
            cy.log('API Response:', interception.response.body);
          }else{
            cy.log('No API Response');
          }
        });

   
    cy.get('h2').should('contain', 'What is React?');
    cy.get('.alert').contains('A library').prev('.btn-primary').click();
    cy.wait(500);
    cy.get('.btn-primary').then(($buttons) => {
        cy.log(`Number of buttons: ${$buttons.length}`);
      });
      cy.get('.btn-primary').each(($btn, index) => {
        cy.log(`Button ${index}: ${$btn.text().trim()}`);
      });
      cy.get('.btn-primary').then(($buttons) => {
        $buttons.each((index, button) => {
          cy.log(`Button ${index} HTML: ${button.outerHTML}`);
        });
      });
    // cy.get('.btn-primary',{timeout:10000}).should('have.length', 4).contains('A library').should('be.visible').click();

        // Verify the second question
      cy.get('h2').should('contain', 'What is Node.js?');
    //   cy.get('.btn-primary').contains('A runtime').click();
    cy.get('.alert')
      .contains('A runtime')
      .prev('.btn-primary')
      .click();
  
      // Verify the quiz completion
      cy.get('.card').contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').should('contain', 'Your score: 2/2');
    });
  });