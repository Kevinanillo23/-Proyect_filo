describe("Gestión de Usuarios (Admin)", () => {
    before(() => {
        cy.checkBackendHealth();
    });

    beforeEach(() => {
        // Login como admin usando comando personalizado
        cy.login();

        // Navegar a gestión de usuarios
        cy.visit('/users');

        // Esperar a que la página cargue
        cy.get('h1, h2, table', { timeout: 10000 }).should('be.visible');
    });

    it("Debería listar los usuarios correctamente", () => {
        // Verificar que la tabla está visible
        cy.get('table').should("be.visible");

        // Verificar que hay al menos un usuario (el admin)
        cy.get('tbody tr').should("have.length.at.least", 1);

        // Verificar que se muestran las columnas esperadas
        cy.get('thead th').should('have.length.at.least', 3);

        // Verificar que hay datos de usuario visibles
        cy.get('tbody tr').first().within(() => {
            cy.get('td').should('have.length.at.least', 3);
        });
    });

    it("Debería permitir editar un usuario (cambiar rol)", () => {
        // Esperar a que carguen los usuarios
        cy.get('tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);

        // Encontrar y hacer click en el botón de editar del primer usuario
        cy.get('tbody tr').first()
            .find('button, .edit')
            .contains(/edit|editar/i)
            .click();

        // Verificar que el formulario se llenó con los datos del usuario
        cy.get('.user-form input[placeholder*="Nombre"], .user-form input[name="firstname"]')
            .should("not.have.value", "");

        // Interceptar la actualización de forma agnóstica al método (PATCH/PUT)
        cy.intercept({
            method: /(PATCH|PUT)/,
            url: "**/api/users/*"
        }).as("saveUser");

        // Cambiar el rol (seleccionar admin)
        cy.get('select').select('admin');

        // Enviar formulario
        cy.get('.user-form button[type="submit"]').click();

        // Esperar la respuesta única de guardado
        cy.wait("@saveUser", { timeout: 20000 }).then((interception) => {
            expect(interception.response.statusCode).to.be.oneOf([200, 201]);
            cy.log("✅ Usuario actualizado en el servidor");
        });

        // Verificar mensaje de confirmación
        cy.contains(/actualizado|éxito|modificado/i, {
            matchCase: false,
            timeout: 10000
        }).should("be.visible");
    });

    it("Debería mostrar confirmación antes de eliminar", () => {
        // Esperar a que carguen los usuarios
        cy.get('tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);

        // Interceptar el diálogo de confirmación
        cy.on('window:confirm', (str) => {
            // Verificar que el mensaje de confirmación contiene texto relevante
            expect(str.toLowerCase()).to.match(/seguro|eliminar|borrar|delete/);
            return false; // Cancelar la eliminación
        });

        // Click en el botón de eliminar
        cy.get('tbody tr').first()
            .find('button, .delete')
            .contains(/delete|eliminar|borrar/i)
            .click();

        // Verificar que el usuario sigue existente (no se eliminó)
        cy.get('tbody tr').should('have.length.at.least', 1);
    });

    it("Debería filtrar/buscar usuarios (si existe funcionalidad)", () => {
        // Este test es opcional y depende de si hay búsqueda implementada
        cy.get('body').then(($body) => {
            // Solo ejecutar si existe un campo de búsqueda
            if ($body.find('input[type="search"], input[placeholder*="buscar"]').length > 0) {
                cy.get('input[type="search"], input[placeholder*="buscar"]')
                    .type('admin');

                // Verificar que se filtraron los resultados
                cy.get('tbody tr').should('have.length.at.least', 1);
                cy.contains('admin', { matchCase: false }).should('be.visible');
            } else {
                cy.log('No hay funcionalidad de búsqueda implementada, test omitido');
            }
        });
    });

    it("Debería mostrar correctamente los roles de usuarios", () => {
        // Verificar que los roles se muestran en la tabla
        cy.get('tbody tr').first().within(() => {
            // Buscar una celda que contenga 'admin' o 'user'
            cy.contains(/admin|user/i).should('exist');
        });
    });
});
