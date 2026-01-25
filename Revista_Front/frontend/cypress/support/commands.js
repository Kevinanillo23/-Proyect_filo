// ***********************************************
// Custom Commands para Cypress Tests
// ***********************************************

/**
 * Comando personalizado para hacer login
 * @example cy.login() // Login con credenciales de admin por defecto
 * @example cy.login('user123', 'password123')
 */
Cypress.Commands.add('login', (username, password) => {
    const user = username || Cypress.env('adminUsername');
    const pass = password || Cypress.env('adminPassword');

    // Desactivamos cy.session temporalmente para evitar el error de "session already exists"
    // que ocurre al editar código en caliente en el modo Cypress Open.
    cy.visit('/login');

    cy.get('input[name="username"]').clear().type(user);
    cy.get('input[name="password"]').clear().type(pass);

    // Selector ultra-robusto basado en texto
    cy.contains('button', /Acceder/i).click();

    // Esperar a que el login sea exitoso
    cy.url().should('not.include', '/login');
    cy.window().its('localStorage.token').should('exist');
});

/**
 * Limpia el sessionStorage
 */
Cypress.Commands.add('clearSessionStorage', () => {
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
});

/**
 * Comando personalizado para logout
 * @example cy.logout()
 */
Cypress.Commands.add('logout', () => {
    cy.window().then((win) => {
        win.localStorage.removeItem('token');
        win.localStorage.removeItem('refreshToken');
    });
    cy.visit('/login');
});

/**
 * Comando personalizado para crear un usuario aleatorio
 * @example cy.createRandomUser().then((userData) => { ... })
 */
Cypress.Commands.add('createRandomUser', () => {
    const timestamp = Date.now();
    const userData = {
        firstname: 'Test',
        lastname: 'User',
        username: `testuser_${timestamp}`,
        email: `testuser_${timestamp}@example.com`,
        password: 'TestPass123'
    };

    return cy.wrap(userData);
});

/**
 * Comando para verificar que el backend está disponible
 * @example cy.checkBackendHealth()
 */
Cypress.Commands.add('checkBackendHealth', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}/`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

/**
 * Comando para limpiar localStorage
 * @example cy.clearStorage()
 */
Cypress.Commands.add('clearStorage', () => {
    cy.window().then((win) => {
        win.localStorage.clear();
        win.sessionStorage.clear();
    });
});