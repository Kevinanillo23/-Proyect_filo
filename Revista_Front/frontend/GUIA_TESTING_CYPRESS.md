# 🧪 Guía de Testing con Cypress - Filosofía&Co

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Configuración](#configuración)
3. [Comandos Personalizados](#comandos-personalizados)
4. [Ejecutar Tests](#ejecutar-tests)
5. [Estructura de Tests](#estructura-de-tests)
6. [Solución de Problemas](#solución-de-problemas)
7. [Best Practices](#best-practices)

---

## 🎯 Introducción

Este proyecto incluye una suite completa de tests E2E (End-to-End) con Cypress que valida todas las funcionalidades críticas de la aplicación:

- ✅ **Autenticación**: Login, registro, recuperación de contraseña
- ✅ **Gestión de Artículos**: Crear, editar, eliminar (CRUD completo)
- ✅ **Gestión de Usuarios**: Listar, editar, eliminar usuarios (Admin)
- ✅ **Seguridad**: Validación de tokens, roles y permisos

---

## ⚙️ Configuración

### Prerequisitos

Antes de ejecutar los tests, asegúrate de que:

1. **Backend está corriendo**:
   ```bash
   cd Revista_Back/backend
   npm start
   ```
   Debe estar disponible en `http://localhost:5000`

2. **Frontend está corriendo**:
   ```bash
   cd Revista_Front/frontend
   npm run dev
   ```
   Debe estar disponible en `http://localhost:5173`

3. **Base de datos configurada**:
   - MySQL corriendo con la base de datos `filco`
   - MongoDB corriendo (local o Atlas)

4. **Usuario admin creado**:
   ```bash
   cd Revista_Back/backend
   node seedAdmin.js
   ```
   Credenciales:
   - Username: `admin`
   - Password: `Admin1234`

### Variables de Entorno de Cypress

Las variables están configuradas en `cypress.config.js`:

```javascript
env: {
  apiUrl: "http://localhost:5000",
  adminUsername: "admin",
  adminPassword: "Admin1234"
}
```

---

## 🛠️ Comandos Personalizados

Hemos creado comandos personalizados para simplificar los tests. Están definidos en `cypress/support/commands.js`:

### `cy.login(username, password)`

Realiza login y guarda la sesión. Si no se pasan parámetros, usa las credenciales de admin por defecto.

```javascript
// Login como admin (por defecto)
cy.login();

// Login con credenciales personalizadas
cy.login('usuario123', 'password123');
```

### `cy.logout()`

Cierra sesión y limpia el localStorage.

```javascript
cy.logout();
```

### `cy.createRandomUser()`

Genera datos de un usuario aleatorio para tests de registro.

```javascript
cy.createRandomUser().then((userData) => {
  cy.get('input[name="username"]').type(userData.username);
  cy.get('input[name="email"]').type(userData.email);
  // ...
});
```

### `cy.checkBackendHealth()`

Verifica que el backend está disponible antes de ejecutar tests.

```javascript
before(() => {
  cy.checkBackendHealth();
});
```

### `cy.clearStorage()`

Limpia localStorage y sessionStorage.

```javascript
beforeEach(() => {
  cy.clearStorage();
});
```

---

## 🚀 Ejecutar Tests

### Modo Interactivo (Recomendado para Desarrollo)

Este modo abre la interfaz de Cypress donde puedes ver los tests ejecutándose en tiempo real:

```bash
cd Revista_Front/frontend
npx cypress open
```

**Pasos**:
1. Selecciona "E2E Testing"
2. Elige un navegador (Chrome, Firefox, Edge)
3. Haz click en un archivo de test para ejecutarlo
4. Observa la ejecución en tiempo real

**Ventajas**:
- ✅ Ver la aplicación mientras se ejecutan los tests
- ✅ Time-travel debugging (volver a estados anteriores)
- ✅ Ejecutar tests individuales
- ✅ Recargar automáticamente al cambiar archivos

### Modo Headless (Para CI/CD)

Este modo ejecuta todos los tests sin interfaz gráfica:

```bash
cd Revista_Front/frontend
npm run cypress:run
```

**Genera**:
- Videos de cada test en `cypress/videos/`
- Screenshots de fallos en `cypress/screenshots/`

### Ejecutar Tests Específicos

```bash
# Solo tests de login
npx cypress run --spec "cypress/e2e/testLogin.cy.js"

# Solo tests de artículos
npx cypress run --spec "cypress/e2e/articles.cy.js"

# Múltiples archivos
npx cypress run --spec "cypress/e2e/testLogin.cy.js,cypress/e2e/auth_security.cy.js"
```

---

## 📁 Estructura de Tests

```
cypress/
├── e2e/
│   ├── testLogin.cy.js         # Tests de login
│   ├── auth_security.cy.js     # Tests de autenticación y seguridad
│   ├── articles.cy.js          # Tests CRUD de artículos
│   └── users.cy.js             # Tests gestión de usuarios
│
├── support/
│   ├── commands.js             # Comandos personalizados
│   └── e2e.js                  # Configuración global
│
├── fixtures/                   # Datos de prueba (JSON)
├── screenshots/                # Screenshots de fallos
└── videos/                     # Videos de ejecución
```

### Descripción de Tests

#### `testLogin.cy.js`
- ✅ Login exitoso con credenciales correctas
- ✅ Error con credenciales incorrectas
- ✅ Verificación de token en localStorage
- ✅ Redirección después del login

#### `auth_security.cy.js`
- ✅ Registro de nuevo usuario
- ✅ Recuperación de contraseña
- ✅ Validación de email duplicado
- ✅ Verificación de seguridad

#### `articles.cy.js`
- ✅ Crear artículo (solo Admin)
- ✅ Editar artículo existente
- ✅ Cancelar eliminación
- ✅ Confirmar y eliminar artículo

#### `users.cy.js`
- ✅ Listar usuarios
- ✅ Editar usuario (cambiar rol)
- ✅ Confirmación antes de eliminar
- ✅ Validación de roles

---

## 🔧 Solución de Problemas

### ❌ Error: "Timed out retrying: Expected to find element"

**Causa**: El elemento no existe o tarda en cargar.

**Solución**:
1. Aumentar timeout:
   ```javascript
   cy.get('.mi-elemento', { timeout: 10000 }).should('be.visible');
   ```

2. Verificar que el selector es correcto:
   ```javascript
   cy.get('input[name="username"]')  // Correcto
   cy.get('.username')               // Si tiene esa clase
   ```

3. Esperar a que la página cargue:
   ```javascript
   cy.wait(1000); // Solo para debugging, no ideal
   ```

### ❌ Error: "cy.visit() failed trying to load"

**Causa**: El servidor frontend no está corriendo.

**Solución**:
```bash
cd Revista_Front/frontend
npm run dev
```

Verificar que está en `http://localhost:5173`

### ❌ Error: "Network request failed"

**Causa**: El backend no está corriendo o no responde.

**Solución**:
1. Verificar backend:
   ```bash
   cd Revista_Back/backend
   npm start
   ```

2. Probar endpoint manualmente:
   ```bash
   curl http://localhost:5000/
   ```

3. Verificar logs del servidor

### ❌ Error: "Invalid username or password"

**Causa**: El usuario admin no existe en la base de datos.

**Solución**:
```bash
cd Revista_Back/backend
node seedAdmin.js
```

### ❌ Error: "CORS policy blocked"

**Causa**: El backend no tiene configurado CORS para localhost:5173.

**Solución**: Verificar en `server.js`:
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
```

### ❌ Tests pasan localmente pero fallan en CI/CD

**Causas y soluciones**:

1. **Timeouts muy cortos**: Aumentar timeouts en `cypress.config.js`
2. **Datos de prueba**: Asegurarse de que la BD de CI tiene datos iniciales
3. **Variables de entorno**: Verificar que están configuradas en CI
4. **Puertos**: Asegurarse de que los servicios usan los puertos correctos

---

## ✅ Best Practices

### 1. Usar Comandos Personalizados

❌ **Mal**:
```javascript
it('Test', () => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('admin');
  cy.get('input[name="password"]').type('Admin1234');
  cy.get('button').click();
});
```

✅ **Bien**:
```javascript
it('Test', () => {
  cy.login();
  cy.visit('/mi-pagina');
});
```

### 2. Usar `data-testid` para Selectores Estables

❌ **Mal** (frágil, puede cambiar con el diseño):
```javascript
cy.get('.button-primary-large').click();
```

✅ **Bien**:
```javascript
cy.get('[data-testid="submit-button"]').click();
```

### 3. Interceptar Requests de API

✅ **Recomendado**:
```javascript
cy.intercept('POST', '**/api/articles').as('createArticle');
cy.get('button').click();
cy.wait('@createArticle').then((interception) => {
  expect(interception.response.statusCode).to.eq(201);
});
```

### 4. Limpiar Estado Entre Tests

✅ **Siempre hacer**:
```javascript
beforeEach(() => {
  cy.clearStorage();
  // Resetear otros estados si es necesario
});
```

### 5. Usar Assertions Significativas

❌ **Mal**:
```javascript
cy.get('.mensaje').should('exist');
```

✅ **Bien**:
```javascript
cy.contains(/éxito|creado correctamente/i).should('be.visible');
```

### 6. Evitar Waits Hardcodeados

❌ **Mal**:
```javascript
cy.wait(5000);
cy.get('.elemento').click();
```

✅ **Bien**:
```javascript
cy.get('.elemento', { timeout: 10000 }).should('be.visible').click();
```

### 7. Tests Independientes

Cada test debe poder ejecutarse de forma aislada:

```javascript
describe('Mi Suite', () => {
  beforeEach(() => {
    // Configurar estado inicial
    cy.login();
    cy.visit('/mi-pagina');
  });

  it('Test 1', () => {
    // Test completamente independiente
  });

  it('Test 2', () => {
    // No depende de Test 1
  });
});
```

---

## 📊 Reportes y Métricas

### Ver Videos de Ejecución

Después de ejecutar `npm run cypress:run`, los videos están en:
```
cypress/videos/
  ├── testLogin.cy.js.mp4
  ├── auth_security.cy.js.mp4
  └── ...
```

### Ver Screenshots de Fallos

Si un test falla, se genera un screenshot:
```
cypress/screenshots/
  └── testLogin.cy.js/
      └── Test Name -- Login failed (failed).png
```

### Integración con CI/CD

Ejemplo para GitHub Actions (`.github/workflows/cypress.yml`):

```yaml
name: Cypress Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: |
          cd Revista_Front/frontend
          npm install
      
      - name: Run Cypress
        uses: cypress-io/github-action@v5
        with:
          working-directory: Revista_Front/frontend
          start: npm start
          wait-on: 'http://localhost:5173'
          wait-on-timeout: 120
```

---

## 📞 Ayuda Adicional

### Documentación Oficial
- [Cypress Docs](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

### Comandos Útiles de Debug

```javascript
// Pausar ejecución
cy.pause();

// Log en consola
cy.log('Mi mensaje de debug');

// Debug con snapshot
cy.get('.elemento').debug();

// Ver estado completo
cy.screenshot('debug-screenshot');
```

### Generar Reporte HTML

Instalar reporter:
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

Configurar en `cypress.config.js`:
```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
```

---

## 🎯 Próximos Pasos

- [ ] Añadir tests de performance
- [ ] Implementar tests de accesibilidad (cypress-axe)
- [ ] Añadir tests de responsive design
- [ ] Implementar visual regression testing
- [ ] Configurar Cypress Dashboard para métricas

---

**Última actualización**: 2026-01-25  
**Versión de Cypress**: 15.2.0
