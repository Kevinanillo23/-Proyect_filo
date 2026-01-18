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

        // After registration, it should redirect to login or show success
        cy.url().should("include", "/login");
        cy.contains("Usuario registrado correctamente").should("be.visible");
    });

    it("Debería redirigir al login si un usuario no logueado intenta entrar a /article", () => {
        cy.clearLocalStorage();
        cy.clearSessionStorage();
        cy.visit("http://localhost:5173/article", { failOnStatusCode: false });

        // Should be redirected to login
        cy.url().should("include", "/login");
    });

    it("Debería redirigir al inicio si un usuario normal intenta entrar a /users", () => {
        // 1. Register/Login as a normal user
        const normalUser = `normal_${Date.now()}`;
        // We can use an existing one if available, but let's register one to be sure
        cy.visit("http://localhost:5173/register");
        cy.get('input[name="firstname"]').type("Normal");
        cy.get('input[name="lastname"]').type("User");
        cy.get('input[name="username"]').type(normalUser);
        cy.get('input[name="email"]').type(`${normalUser}@example.com`);
        cy.get('input[name="password"]').type("Normal123");
        cy.get('button[type="submit"]').click();

        // Login
        cy.visit("http://localhost:5173/login");
        cy.get('input[name="username"]').type(normalUser);
        cy.get('input[name="password"]').type("Normal123");
        cy.get('button[type="submit"]').click();

        // Try to visit /users manually
        cy.visit("http://localhost:5173/users");

        // Should be redirected to home (/) because role is 'user'
        cy.url().should("eq", "http://localhost:5173/");
    });

    it("Debería mostrar la recuperación de contraseña", () => {
        cy.visit("http://localhost:5173/login");
        cy.contains("¿Olvidaste tu contraseña?").click();

        cy.get('input[placeholder="Tu correo electrónico"]').should("be.visible").type("test@example.com");
        cy.get('button').contains("Enviar enlace").click();

        // Check for the toast or message
        cy.contains("Si el correo existe, se enviará un enlace").should("be.visible");
    });
});
