describe("Auth & Security", () => {
    it("Debería registrar un nuevo usuario correctamente", () => {
        const randomUser = `user_${Date.now()}`;
        cy.visit("http://localhost:5173/register");

        cy.get('input[name="firstname"]').type("Test");
        cy.get('input[name="lastname"]').type("User");
        cy.get('input[name="username"]').type(randomUser);
        cy.get('input[name="email"]').type(`${randomUser}@example.com`);
        cy.get('input[name="password"]').type("Password123");

        cy.get('button[type="submit"]').click();

        // Tras el registro redirige al login con mensaje
        cy.url().should("include", "/login");
        cy.contains(/Registro exitoso/i).should("be.visible");
    });

    it("Debería redirigir al login si un usuario no logueado intenta entrar a /article", () => {
        cy.window().then((win) => {
            win.sessionStorage.clear();
            win.localStorage.clear();
        });
        cy.visit("http://localhost:5173/article", { failOnStatusCode: false });

        cy.url({ timeout: 10000 }).should("include", "/login");
    });

    it("Debería mostrar la recuperación de contraseña", () => {
        cy.visit("http://localhost:5173/login");
        cy.contains("¿Olvidaste tu contraseña?").click();

        cy.get('input[placeholder="tu@email.com"]').should("be.visible").type("test@example.com");
        cy.get('button').contains("Enviar enlace").click();
    });
});
