describe("Login flow", () => {
  it("Debería loguear correctamente y guardar el token en localStorage", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("Admin1234");
    cy.get('button[type="submit"]').click();

    
    cy.url().should("eq", "http://localhost:5173/");

    
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.exist;
      cy.log("Token guardado:", token);
    });
  });
});
