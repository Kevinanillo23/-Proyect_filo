describe("Buscador de Artículos", () => {
    before(() => {
        cy.checkBackendHealth();
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it("Debería buscar y encontrar artículos", () => {
        const searchTerm = "Heidegger"; // Asumiendo que hay algo con este nombre o probaremos con uno conocido

        // En desktop el buscador está visible, en mobile hay que clickear el toggle
        cy.viewport(1280, 720);

        cy.get('.search-input').should('be.visible').type(`${searchTerm}{enter}`);

        // Verificar que la URL cambió
        cy.url().should('include', `search=${searchTerm}`);

        // Verificar que el título principal cambió (usando mi mejora en Home.jsx)
        cy.contains('h1', `Resultados para: "${searchTerm}"`, { timeout: 10000 }).should('be.visible');
    });

    it("Debería funcionar el toggle de búsqueda en móvil", () => {
        cy.viewport('iphone-x');

        // El input no debe ser visible inicialmente
        cy.get('.search-form').should('not.be.visible');

        // Click en el toggle
        cy.get('.search-toggle-mobile').click();

        // Ahora debe ser visible
        cy.get('.search-form').should('be.visible');

        // Buscar
        cy.get('.search-input').type("filosofía{enter}");

        // Verificar URL de forma flexible (soportando encoding)
        cy.url().should((url) => {
            expect(decodeURIComponent(url)).to.include('search=filosofía');
        });
    });
});
