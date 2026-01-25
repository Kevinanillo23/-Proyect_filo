describe("Login Flow", () => {
  // Verificar que el backend esté disponible antes de los tests
  before(() => {
    cy.checkBackendHealth();
  });

  beforeEach(() => {
    cy.clearStorage();
  });

  it("Debería loguear correctamente y guardar el token", () => {
    cy.intercept("POST", "**/api/users/login").as("loginReq");

    cy.visit("/login");

    // Usar selectores ultra-específicos para evitar conflictos con el buscador
    cy.get('.auth-form').within(() => {
      cy.get('input[name="username"]').clear().type(Cypress.env('adminUsername'));
      cy.get('input[name="password"]').clear().type(Cypress.env('adminPassword'));
      cy.contains('button', /Acceder/i).click();
    });

    // Esperar la respuesta del login (usando accessToken real)
    cy.wait("@loginReq", { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('accessToken');
      cy.log("✅ Login exitoso capturado");
    });

    // Verificar redirección
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // Verificar que el token se guardó en localStorage (la app lo guarda como 'token')
    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });

    // Verificar botón de logout
    cy.get('.btn-logout', { timeout: 8000 }).should('be.visible');
  });

  it("Debería mostrar error con credenciales incorrectas", () => {
    cy.intercept("POST", "**/api/users/login").as("loginReq");

    cy.visit("/login");

    cy.get('.auth-form').within(() => {
      cy.get('input[name="username"]').clear().type("usuarioInvalido");
      cy.get('input[name="password"]').clear().type("WrongPass123");
      cy.contains('button', /Acceder/i).click();
    });

    // Esperar respuesta de error (ahora que la petición sí sale del front)
    cy.wait("@loginReq", { timeout: 10000 }).its('response.statusCode').should('be.gte', 400);

    // Verificar que no hay token
    cy.window().its('localStorage.token').should('not.exist');

    // El mensaje de error debe aparecer
    cy.get('.error-message').should('be.visible');
  });
});