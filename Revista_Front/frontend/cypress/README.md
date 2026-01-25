# 🧪 Tests E2E con Cypress

Este directorio contiene todos los tests End-to-End de la aplicación Filosofía&Co.

## 📁 Estructura

```
cypress/
├── e2e/                    # Tests E2E
│   ├── testLogin.cy.js         # ✅ Tests de login
│   ├── auth_security.cy.js     # ✅ Tests de autenticación y seguridad
│   ├── articles.cy.js          # ✅ Tests CRUD de artículos
│   └── users.cy.js             # ✅ Tests gestión de usuarios
│
├── support/                # Configuración y comandos
│   ├── commands.js             # Comandos personalizados
│   └── e2e.js                  # Setup global
│
├── fixtures/               # Datos de prueba (JSON)
├── screenshots/            # Screenshots de fallos
└── videos/                 # Videos de ejecución
```

## 🚀 Inicio Rápido

### 1. Prerequisitos

Asegúrate de que están corriendo:

```bash
# Terminal 1 - Backend
cd Revista_Back/backend
npm start

# Terminal 2 - Frontend
cd Revista_Front/frontend
npm run dev

# Terminal 3 - Cypress
npx cypress open
```

### 2. Ejecutar Tests

**Modo Interactivo**:
```bash
npx cypress open
```

**Modo Headless**:
```bash
npm run cypress:run
```

## ✅ Coverage de Tests

| Funcionalidad | Archivo | Tests |
|--------------|---------|-------|
| Login | `testLogin.cy.js` | 2 tests |
| Autenticación | `auth_security.cy.js` | 3 tests |
| Artículos CRUD | `articles.cy.js` | 4 tests |
| Gestión Usuarios | `users.cy.js` | 5 tests |
| **TOTAL** | **4 archivos** | **14 tests** |

## 🛠️ Comandos Personalizados

Disponible en `support/commands.js`:

- `cy.login()` - Login rápido con admin
- `cy.logout()` - Cerrar sesión
- `cy.createRandomUser()` - Generar datos de usuario
- `cy.checkBackendHealth()` - Verificar backend
- `cy.clearStorage()` - Limpiar localStorage

## 📝 Convenciones

### Nomenclatura
- Archivos: `nombreDescriptivo.cy.js`
- Describes: Usar español y descripción clara
- Its: Comenzar con "Debería..."

### Estructura de Test
```javascript
describe("Nombre del Feature", () => {
  before(() => {
    cy.checkBackendHealth();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/ruta');
  });

  it("Debería hacer algo específico", () => {
    // Arrange
    const data = { ... };
    
    // Act
    cy.get('.selector').click();
    
    // Assert
    cy.contains('Éxito').should('be.visible');
  });
});
```

## 🔧 Troubleshooting

### ❌ "Element not found"
```javascript
cy.get('.mi-elemento', { timeout: 10000 }).should('be.visible');
```

### ❌ "Network request failed"
Verificar que backend está en `http://localhost:5000`

### ❌ "Login failed"
Ejecutar: `node Revista_Back/backend/seedAdmin.js`

## 📚 Documentación Completa

Para más detalles, ver:
- [GUIA_TESTING_CYPRESS.md](../GUIA_TESTING_CYPRESS.md)
- [DOCUMENTACION_COMPLETA.md](../../DOCUMENTACION_COMPLETA.md)

## 🎯 Próximos Tests

- [ ] Tests de comentarios
- [ ] Tests de búsqueda
- [ ] Tests de perfil de usuario
- [ ] Tests de responsive
- [ ] Tests de accesibilidad
