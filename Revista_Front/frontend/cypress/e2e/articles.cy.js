describe("Article CRUD for Admins", () => {
    beforeEach(() => {
        // Login as admin before each test
        cy.visit("http://localhost:5173/login");
        cy.get('input[name="username"]').type("admin");
        cy.get('input[name="password"]').type("Admin1234");
        cy.get('button[type="submit"]').click();
        cy.url().should("eq", "http://localhost:5173/");

        // Go to Article Management
        cy.get('a[href="/article"]').click();
    });

    it("Debería crear un nuevo artículo correctamente", () => {
        const title = `Test Article ${Date.now()}`;
        const content = "Este es un contenido de prueba generado por Cypress.";
        const imageUrl = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60";

        cy.get('input[name="title"]').type(title);
        cy.get('textarea[name="content"]').type(content);
        cy.get('input[name="url"]').type(imageUrl);
        cy.get('.article-form button').click();

        // Verify toast or success
        cy.contains("Artículo creado con éxito").should("be.visible");

        // Verify it exists in the list
        cy.contains(title).should("be.visible");
    });

    it("Debería editar un artículo existente", () => {
        const newTitle = `Edited Article ${Date.now()}`;

        // Find the first article and click edit
        cy.get('.article-item').first().find('.edit-btn').click();

        // Change title
        cy.get('input[name="title"]').clear().type(newTitle);
        cy.get('.article-form button').click();

        cy.contains("Artículo actualizado correctamente").should("be.visible");
        cy.contains(newTitle).should("be.visible");
    });

    it("Debería cancelar la eliminación de un artículo", () => {
        cy.on('window:confirm', () => false);
        cy.get('.article-item').first().find('.delete-btn').click();
        // The article should still be there
        cy.get('.article-item').should("exist");
    });
});
