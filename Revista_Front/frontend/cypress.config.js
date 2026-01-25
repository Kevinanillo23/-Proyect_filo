import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    chromeWebSecurity: false,

    // Optimización para modo UI
    watchForFileChanges: true,

    // Aumentar timeouts para evitar fallos en tests
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    // Viewport por defecto
    viewportWidth: 1280,
    viewportHeight: 720,

    // Opciones de video y screenshots
    video: false, // Desactivar video en modo local para ganar velocidad
    screenshotOnRunFailure: true,

    // Variables de entorno para tests
    env: {
      apiUrl: "http://localhost:5000",
      adminUsername: "admin",
      adminPassword: "Admin1234"
    },

    // Configuración adicional
    retries: {
      runMode: 2,
      openMode: 0
    },

    setupNodeEvents(on, config) {
      // Implementar node events si es necesario
      return config;
    },
  },
});
