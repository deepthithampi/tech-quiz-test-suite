import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust this URL to match your client setup
    supportFile: false, // Disable supportFile if not using custom commands
    setupNodeEvents(on, config) {
      // Event listeners for plugins can go here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite', // Matches the Vite setup in your client
    },
  },
});