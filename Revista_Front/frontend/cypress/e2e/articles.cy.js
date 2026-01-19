describe("Article CRUD for Admins", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // Login as admin before each test
        cy.visit("http://localhost:5173/login");
        cy.get('input[name="username"]').type("admin");
        cy.get('input[name="password"]').type("Admin1234");
        cy.get('button[type="submit"]').click();

        // Esperar a que el login termine
        cy.get('.btn-logout', { timeout: 10000 }).should('be.visible');
        cy.url().should("include", "http://localhost:5173");

        // Ir a Gestión de Artículos
        cy.get('a[href="/article"]').click();
    });

    it("Debería crear un nuevo artículo correctamente", () => {
        const title = `Test Article ${Date.now()}`;
        const content = "Este es un contenido de prueba generado por Cypress.";
        const imageUrl = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60";

        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="content"]').type(content);
        cy.get('input[name="url"]').type(imageUrl);
        cy.intercept("POST", "**/api/articles").as("createArticle");
        cy.get('.article-form-section button').click();

        // Wait for request and verify toast or success
        cy.wait("@createArticle", { timeout: 10000 });
        cy.contains("éxito", { matchCase: false }).should("be.visible");

        // Verify it exists in the list
        cy.contains(title).should("be.visible");
    });

    it("Debería editar un artículo existente", () => {
        const newTitle = `Edited Article ${Date.now()}`;

        // Buscar la primera fila de artículo y pulsar editar
        cy.get('.article-row').first().find('.btn-edit').click();

        // Cambiar título
        cy.intercept("PATCH", "**/api/articles/*").as("updateArticle");
        cy.get('input[name="title"]').clear().type(newTitle);
        cy.get('.article-form-section button').click();

        cy.wait("@updateArticle", { timeout: 10000 });
        cy.contains("actualizado", { matchCase: false }).should("be.visible");
        cy.contains(newTitle, { timeout: 10000 }).should("be.visible");
    });

    it("Debería cancelar la eliminación de un artículo", () => {
        cy.on('window:confirm', () => false);
        cy.get('.article-row').first().find('.btn-delete').click();

        cy.get('.article-row').should("exist");
    });
});
