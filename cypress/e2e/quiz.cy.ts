import { getQuestions } from "../../client/src/services/questionApi";

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
    // cy.wait('@getQuestions').then((interception) => {
    //     if(interception.response){
    //     cy.log('Intercepted Response:', interception.response?.body);
    //     }else{
    //       throw new Error('API response is undefined');
    //     }
    //   });
  
    cy.wait('@getQuestions').its('response.statusCode').should('eq', 200);
    // cy.wait('@getQuestions').then((interception) => {
    //     expect(interception.response).to.exist;
        
    //     if (interception.response) {
    //         console.log('API Response:', interception.response.body);
    //       expect(interception.response.body).to.exist;
    //       expect(interception.response.body[0].answers[0].text).to.eq('A library');
    //     }else {
    //         throw new Error('API response is undefined');
    //       }
        
    //   });
    //   cy.get('.btn-primary').then(($btns) => {
    //     $btns.each((index, btn) => {
    //       console.log(`Button ${index}: ${btn.textContent}`);
    //     });
    //   });
    cy.get('h2').should('contain', 'What is React?');
    cy.get('.btn-primary').should('have.length', 4).contains('A library').should('exist').click();

    // Wait for the button to become visible and interact with it
    // cy.get('.btn-primary')
    // .filter((_, el) => el.textContent?.trim() === 'A library')
    // .should('be.visible')
    // .click();
        // Verify the second question
      cy.get('h2').should('contain', 'What is Node.js?');
      cy.get('.btn-primary').contains('A runtime').click();
  
      // Verify the quiz completion
      cy.get('.card').contains('Quiz Completed').should('be.visible');
      cy.get('.alert-success').should('contain', 'Your score: 2/2');
    });
  });