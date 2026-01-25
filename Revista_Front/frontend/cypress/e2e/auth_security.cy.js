describe("Autenticación y Seguridad", () => {
    before(() => {
        cy.checkBackendHealth();
    });

    beforeEach(() => {
        cy.clearStorage();
    });

    it("Debería registrar un nuevo usuario correctamente", () => {
        // Interceptar ANTES de la visita para no perder nada
        cy.intercept("POST", "**/api/users/register").as("registerReq");

        cy.createRandomUser().then((userData) => {
            cy.visit("/register");

            cy.get('.auth-form').within(() => {
                cy.get('input[name="firstname"]').should('be.visible').type(userData.firstname);
                cy.get('input[name="lastname"]').type(userData.lastname);
                cy.get('input[name="username"]').type(userData.username);
                cy.get('input[name="email"]').type(userData.email);
                cy.get('input[name="password"]').type(userData.password);

                cy.contains('button', /Crear Cuenta/i).click();
            });

            // Esperar el registro con visibilidad de red
            cy.wait('@registerReq', { timeout: 20000 }).then((interception) => {
                expect(interception.response.statusCode).to.be.oneOf([200, 201, 204]);
                cy.log("✅ Registro detectado exitosamente");
            });

            // La navegación puede tardar por el setTimeout de 2s en el front
            cy.url({ timeout: 15000 }).should("include", "/login");
        });
    });

    it("Debería mostrar la recuperación de contraseña", () => {
        cy.visit("/login");
        cy.contains(/¿Olvidaste.*contraseña\?/i, { timeout: 10000 }).click({ force: true });

        // Interceptar endpoint específico
        cy.intercept("POST", "**/api/users/forgot-password").as("forgotPass");

        cy.get('input[placeholder*="email"]', { timeout: 15000 }).type("test@example.com", { force: true });
        cy.contains('button', /Enviar enlace/i).click({ force: true });

        cy.wait("@forgotPass", { timeout: 20000 }).its('response.statusCode').should('be.oneOf', [200, 201]);
        cy.contains(/enviado|correo|email/i, { timeout: 15000 }).should('be.visible');
    });

    it("No debería permitir registro con email duplicado", () => {
        const duplicateEmail = `dup_${Date.now()}@example.com`;

        // 1. Registro exitoso
        cy.visit("/register");
        cy.get('.auth-form').within(() => {
            cy.get('input[name="firstname"]').type("Test");
            cy.get('input[name="lastname"]').type("User");
            cy.get('input[name="username"]').type(`u1_${Date.now()}`);
            cy.get('input[name="email"]').type(duplicateEmail);
            cy.get('input[name="password"]').type("Pass1234");
            cy.contains('button', /Crear Cuenta/i).click();
        });

        // Esperar a llegar al login (fin del primer flujo)
        cy.url({ timeout: 20000 }).should("include", "/login");

        // 2. Registro fallido (mismo email)
        cy.visit("/register");
        cy.intercept("POST", "**/api/users/register").as("duplicateRegister");

        cy.get('.auth-form').within(() => {
            cy.get('input[name="firstname"]').type("Fail");
            cy.get('input[name="lastname"]').type("User");
            cy.get('input[name="username"]').type(`u2_${Date.now()}`);
            cy.get('input[name="email"]').type(duplicateEmail);
            cy.get('input[name="password"]').type("Pass1234");
            cy.contains('button', /Crear Cuenta/i).click();
        });

        // Validar el error de forma robusta
        cy.wait("@duplicateRegister", { timeout: 20000 }).then((interception) => {
            const { statusCode, body } = interception.response;
            cy.log(`Status recivido: ${statusCode}`);
            if (statusCode !== 400) {
                cy.log(`Error real detectado: ${JSON.stringify(body)}`);
            }
            expect(statusCode).to.eq(400);
            expect(body.error).to.match(/ya está registrado|existe/i);
        });

        cy.get('body').should('contain', 'email ya está registrado');
    });
});