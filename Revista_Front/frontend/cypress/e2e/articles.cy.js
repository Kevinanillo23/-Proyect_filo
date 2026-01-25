describe("CRUD de Artículos (Admin)", () => {
    before(() => {
        cy.checkBackendHealth();
    });

    beforeEach(() => {
        // Limpiar estado antes de cada test para evitar interferencias
        cy.clearLocalStorage();
        cy.clearSessionStorage();

        // Usar el comando personalizado de login
        cy.login();

        // Visitar la página de gestión
        cy.visit('/article');

        // Verificar que estamos en la página correcta
        cy.url().should('include', '/article');

        // Esperar a que el título principal de la sección sea visible
        cy.contains('h1', 'Artículos', { timeout: 15000 }).should('be.visible');
    });

    it("Debería crear un nuevo artículo correctamente", () => {
        const title = `Test Article ${Date.now()}`;
        const content = "Este es un contenido de prueba generado por Cypress para validar la creación de artículoculos en la plataforma FILCO.";
        const imageUrl = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60";

        // Llenar el formulario
        cy.get('.article-form input[name="title"]').clear().type(title);
        cy.get('.article-form textarea[name="content"]').clear().type(content);
        cy.get('.article-form input[name="url"]').clear().type(imageUrl);

        // Interceptar la petición
        cy.intercept("POST", "**/api/articles").as("createArticle");

        // Enviar formulario
        cy.get('.article-form button, button.btn-primary').contains(/publicar|guardar/i).click();

        // Esperar respuesta
        cy.wait("@createArticle", { timeout: 15000 }).then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            cy.log("Artículo creado exitosamente");
        });

        // Verificar mensaje de éxito
        cy.contains(/éxito|creado|correctamente/i, { matchCase: false, timeout: 10000 })
            .should("be.visible");

        // Verificar que aparece en la lista (damos tiempo extra por el fetch posterior)
        cy.contains(title, { timeout: 15000 }).should("exist");
    });

    it("Debería editar un artículo existente", () => {
        const newTitle = `Edited Article ${Date.now()}`;

        // Esperar a que carguen los artículos
        cy.get('.article-row, tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);

        // Buscar el botón de editar y hacer click
        cy.get('.article-row, tbody tr').first()
            .find('.btn-edit, button').contains(/edit|editar/i).click();

        // Interceptar actualización (un solo alias para ambos métodos)
        cy.intercept({ method: /PATCH|PUT/, url: "**/api/articles/*" }).as("updateArticle");

        // Cambiar el título
        cy.get('.article-form input[name="title"]').clear().type(newTitle);

        // Seleccionar una categoría si existe el select (opcional)
        cy.get('.article-form select[name="category"]').select('Estoicismo');

        // Enviar el formulario
        cy.get('.article-form button, button.btn-primary').contains(/guardar|publicar/i).click();

        // Esperar respuesta de forma robusta
        cy.wait('@updateArticle', { timeout: 15000 }).then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            cy.log(`Artículo actualizado vía ${interception.request.method}`);
        });

        // Verificar mensaje de confirmación
        cy.contains(/actualizado|éxito|modificado/i, { matchCase: false, timeout: 10000 })
            .should("be.visible");

        // Verificar que el título actualizado aparece
        cy.contains(newTitle, { timeout: 15000 }).should("exist");
    });

    it("Debería cancelar la eliminación de un artículo", () => {
        // Esperar a que carguen los artículos
        cy.get('.article-row, tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);

        // Contar artículos antes de la cancelación
        cy.get('.article-row, tbody tr').then(($rows) => {
            const initialCount = $rows.length;

            // Interceptar el diálogo de confirmación y cancelar
            cy.on('window:confirm', () => false);

            // Click en eliminar
            cy.get('.article-row, tbody tr').first()
                .find('.btn-delete, button').contains(/delete|eliminar|borrar/i).click();

            // Verificar que sigue existiendo el mismo número de artículos
            cy.get('.article-row, tbody tr').should('have.length', initialCount);
        });
    });

    it("Debería confirmar y eliminar un artículo", () => {
        // Esperar a que carguen los artículos
        cy.get('.article-row, tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);

        // Guardar el título del artículo a eliminar
        cy.get('.article-row, tbody tr').first().then(($row) => {
            const articleTitle = $row.text();

            // Interceptar petición de eliminación
            cy.intercept("DELETE", "**/api/articles/*").as("deleteArticle");

            // Aceptar el diálogo de confirmación
            cy.on('window:confirm', () => true);

            // Click en eliminar
            cy.get('.article-row, tbody tr').first()
                .find('.btn-delete, button').contains(/delete|eliminar|borrar/i).click();

            // Esperar la respuesta
            cy.wait("@deleteArticle", { timeout: 10000 }).then((interception) => {
                expect(interception.response.statusCode).to.be.oneOf([200, 204]);
                cy.log("Artículo eliminado");
            });

            // Verificar mensaje de éxito (opcional, depende de la implementación)
            // cy.contains(/eliminado|borrado|éxito/i, { timeout: 5000 });
        });
    });
});
