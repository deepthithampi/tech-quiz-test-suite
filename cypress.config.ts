import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    supportFile: false, 
    setupNodeEvents(on, config) {
      
    },
   
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite', // Matches the Vite setup in your client
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts', 
    indexHtmlFile: 'cypress/support/component-index.html',
    
  },
});