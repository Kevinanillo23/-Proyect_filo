describe("Login flow", () => {
  it("Debería loguear correctamente y guardar el token en localStorage", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("Admin1234");
    cy.get('button[type="submit"]').click();

    // Confirmar que el login terminó esperando a que cambie la UI
    cy.get('.btn-logout', { timeout: 10000 }).should('be.visible');

    cy.url().should("include", "http://localhost:5173");

    cy.window().should((win) => {
      expect(win.localStorage.getItem("token")).to.exist;
    });
  });
});
