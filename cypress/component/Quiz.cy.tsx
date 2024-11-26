// import  React from 'react';
import Quiz from '../../client/src/components/Quiz'; 

import { mount } from 'cypress/react18';

describe('<Quiz /> Component', () => {
  beforeEach(() => {
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
 
  it('renders the "Start Quiz" button', () => {
    mount(<Quiz/>);
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('fetches and displays the first question', () => {
    mount(<Quiz/>);
    cy.get('button').contains('Start Quiz').click();

    // Wait for the intercepted API call
    cy.wait('@getQuestions');

    // Verify the first question is displayed
    cy.get('h2').should('contain', 'What is React?');
    cy.get('.btn-primary').should('have.length', 4); // Four answers
  });

  it('updates the score and moves to the next question', () => {
    mount(<Quiz/>);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    // Answer the first question correctly
   cy.get('.btn-primary').eq(0).click();
   cy.get('h2').should('contain', 'What is Node.js?');


     // Answer the second question correctly
   cy.get('.btn-primary').each(($btn) => {
    if ($btn.next().text().trim() === 'A runtime') {
      cy.wrap($btn).click();
    }
   });
    cy.get('.card').contains('Quiz Completed').should('be.visible');
    cy.get('.alert-success').should('contain', 'Your score: 2/2');
  });
});

