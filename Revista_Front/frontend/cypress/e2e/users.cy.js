describe("User Management for Admins", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        // Login as admin
        cy.visit("http://localhost:5173/login");
        cy.get('input[name="username"]').type("admin");
        cy.get('input[name="password"]').type("Admin1234");
        cy.get('button[type="submit"]').click();

        // Esperar a que el login procese
        cy.get('.btn-logout', { timeout: 10000 }).should('be.visible');

        // Go to User Management
        cy.get('a[href="/users"]').click();
    });

    it("Debería listar los usuarios correctamente", () => {
        cy.get('table').should("be.visible");
        cy.get('tbody tr').should("have.length.at.least", 1);
    });

    it("Debería permitir editar un usuario (cambiar rol)", () => {
        // Find a user row (not the first session admin if possible, but let's just pick the first in table)
        cy.get('tbody tr').first().find('.edit').click();

        // Check if the form is filled
        cy.get('input[placeholder="Nombre"]').should("not.have.value", "");

        // Change role
        cy.intercept("PATCH", "**/api/users/*").as("updateUser");
        cy.get('select').select('admin');
        cy.get('button[type="submit"]').click();

        cy.wait("@updateUser", { timeout: 10000 });
        cy.contains("actualizado", { matchCase: false }).should("be.visible");
    });

    it("Debería mostrar confirmación antes de eliminar", () => {
        cy.on('window:confirm', (str) => {
            expect(str).to.include("¿Estás seguro de que deseas eliminar");
            return false; // Cancel
        });

        cy.get('.delete').first().click();
    });
});
