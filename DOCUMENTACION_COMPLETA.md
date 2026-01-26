# 📚 Documentación Completa - Filosofía&Co (FILCO)

## 📋 Índice
1. [Descripción General del Proyecto](#descripción-general-del-proyecto)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Guía de Uso](#guía-de-uso)
7. [API Endpoints](#api-endpoints)
8. [Testing con Cypress](#testing-con-cypress)
9. [Testing de Rendimiento (JMeter)](#testing-de-rendimiento-jmeter)
10. [Seguridad](#seguridad)
11. [Deployment](#deployment)
12. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 Descripción General del Proyecto

**Filosofía&Co (FILCO)** es una plataforma web fullstack profesional diseñada para la gestión, lectura y administración de contenido cultural y filosófico. 

### Características Principales:
- 🔐 Sistema de autenticación robusto con refresh tokens
- 📝 Gestión completa de artículos (CRUD)
- 👥 Administración de usuarios y roles
- 💬 Sistema de comentarios en artículos
- 🔍 Búsqueda inteligente de contenido
- 🎨 Interfaz moderna con efectos glassmorphism
- 🛡️ Seguridad multicapa (Helmet, Rate Limiting, XSS Protection)
- 📊 Documentación API con Swagger
- 🧪 Testing E2E con Cypress

### Roles de Usuario:
- **Admin**: Acceso total al sistema (gestión de usuarios, artículos, comentarios)
- **User**: Lectura de artículos, comentarios y gestión de su perfil

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General
```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React 19 + Vite + React Router 7                           │
│  Puerto: 5173                                                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/REST API
                      │ (CORS habilitado)
┌─────────────────────▼───────────────────────────────────────┐
│                        BACKEND                               │
│  Node.js + Express                                           │
│  Puerto: 5000                                                │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ Middleware Layer │  │  Security Layer  │                │
│  │ - CORS           │  │  - Helmet        │                │
│  │ - Body Parser    │  │  - Rate Limit    │                │
│  │ - JWT Auth       │  │  - HPP           │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────┬────────────────────────────┬─────────────────────┘
          │                            │
          │                            │
┌─────────▼──────────┐      ┌──────────▼──────────┐
│   MySQL/MariaDB    │      │      MongoDB        │
│   (Sequelize)      │      │     (Mongoose)      │
│                    │      │                     │
│  - Usuarios        │      │  - Artículos        │
│  - Roles           │      │  - Comentarios      │
│  - Refresh Tokens  │      │  - Metadatos        │
└────────────────────┘      └─────────────────────┘
```

### Flujo de Autenticación
```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Login   │─────▶│  JWT     │─────▶│ Access + │
│  Form    │      │ Creation │      │ Refresh  │
└──────────┘      └──────────┘      └─────┬────┘
                                          │
                                          ▼
                                    ┌──────────┐
                                    │localStorage│
                                    │  + DB    │
                                    └──────────┘
```

---

## 💻 Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.1.1 | Framework UI |
| React Router DOM | 7.9.1 | Navegación SPA |
| Vite | 7.1.2 | Build tool & Dev Server |
| React Hot Toast | 2.6.0 | Notificaciones |
| Cypress | 15.2.0 | Testing E2E |
| JSDoc | 4.0.4 | Documentación |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | - | Runtime JavaScript |
| Express | 5.1.0 | Framework web |
| Sequelize | 6.37.7 | ORM para MySQL |
| Mongoose | 8.18.1 | ODM para MongoDB |
| JWT | 9.0.2 | Autenticación |
| Bcrypt | 6.0.0 | Hashing de contraseñas |
| Helmet | 8.1.0 | Seguridad HTTP |
| Express Rate Limit | 8.2.1 | Anti DDoS |
| Nodemailer | 7.0.6 | Envío de emails |
| Swagger | 6.2.8 | Documentación API |

### Bases de Datos
- **MySQL/MariaDB**: Datos estructurados (usuarios, roles, tokens)
- **MongoDB**: Datos flexibles (artículos, comentarios)

---

## 📁 Estructura del Proyecto

```
practicas/
│
├── Revista_Back/
│   └── backend/
│       ├── config/
│       │   ├── db.js              # Configuración MySQL
│       │   ├── mongo.js           # Configuración MongoDB
│       │   └── swagger.js         # Configuración Swagger
│       │
│       ├── controllers/
│       │   ├── articleController.js
│       │   ├── authController.js
│       │   └── userController.js
│       │
│       ├── models/
│       │   ├── Article.js         # Modelo MongoDB
│       │   ├── User.js            # Modelo MySQL
│       │   └── RefreshToken.js    # Modelo MySQL
│       │
│       ├── routes/
│       │   ├── articleRoutes.js
│       │   ├── auth.js
│       │   └── userRoutes.js
│       │
│       ├── Middleware/
│       │   ├── authMiddleware.js  # Verificación JWT
│       │   └── roleMiddleware.js  # Control de acceso
│       │
│       ├── utils/
│       │   ├── mailer.js
│       │   └── validator.js
│       │
│       ├── .env                   # Variables de entorno
│       ├── .env.example
│       ├── package.json
│       ├── server.js              # Punto de entrada
│       └── seedAdmin.js           # Script para crear admin
│
├── Revista_Front/
│   └── frontend/
│       ├── public/
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── ArticleCard.jsx
│       │   │   ├── CommentSection.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── GlassCard.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── PrivateRoute.jsx
│       │   │   └── Register.jsx
│       │   │
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── ArticleDetail.jsx
│       │   │   ├── ArticleManagement.jsx
│       │   │   ├── UserManagement.jsx
│       │   │   ├── About.jsx
│       │   │   └── Profile.jsx
│       │   │
│       │   ├── styles/
│       │   │   ├── ArticleCard.css
│       │   │   ├── Header.css
│       │   │   └── [otros estilos]
│       │   │
│       │   ├── utils/
│       │   │   ├── authUtils.js    # Funciones de autenticación
│       │   │   └── fetchWithAuth.js # HTTP client con refresh
│       │   │
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── configuration.js    # URLs y constantes
│       │   └── index.css
│       │
│       ├── cypress/
│       │   ├── e2e/
│       │   │   ├── testLogin.cy.js
│       │   │   ├── auth_security.cy.js
│       │   │   ├── articles.cy.js
│       │   │   └── users.cy.js
│       │   └── support/
│       │
│       ├── .env                    # Variables de entorno
│       ├── .env.example
│       ├── cypress.config.js
│       ├── package.json
│       └── vite.config.js
│
├── README.md
└── DOCUMENTACION_COMPLETA.md      # Este archivo
```

---

## ⚙️ Instalación y Configuración

### Prerequisitos
- Node.js >= 18.x
- MySQL/MariaDB >= 8.0
- MongoDB >= 6.0 (opcional si usas MongoDB Atlas)
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd practicas
```

### 2. Configurar Backend

#### 2.1. Instalar Dependencias
```bash
cd Revista_Back/backend
npm install
```

#### 2.2. Configurar Variables de Entorno
Crear archivo `.env` basándose en `.env.example`:

```bash
PORT=5000
CLIENT_URL=http://localhost:5173

# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=filco
DB_DIALECT=mysql

# JWT Secrets (Cambiar en producción)
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
REFRESH_TOKEN_SECRET=tu_secreto_refresh_super_seguro_cambiar

# Email (Para recuperación de contraseña)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_password_de_aplicacion
EMAIL_SERVICE=gmail

# MongoDB
MONGO_URI=mongodb://localhost:27017/revista
# O usa MongoDB Atlas:
# MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/revista

NODE_ENV=development
```

#### 2.3. Configurar Base de Datos MySQL
```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE filco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### 2.4. Crear Usuario Admin Inicial
```bash
node seedAdmin.js
```
Esto creará un usuario admin con:
- **Username**: `admin`
- **Password**: `Admin1234`

⚠️ **Importante**: Cambiar esta contraseña en producción.

### 3. Configurar Frontend

#### 3.1. Instalar Dependencias
```bash
cd ../../Revista_Front/frontend
npm install
```

#### 3.2. Configurar Variables de Entorno
Crear archivo `.env`:

```bash
VITE_API_URL=http://localhost:5000
```

---

## 🚀 Guía de Uso

### Iniciar el Proyecto en Desarrollo

#### Terminal 1 - Backend
```bash
cd Revista_Back/backend
npm start
# El servidor estará en http://localhost:5000
```

#### Terminal 2 - Frontend
```bash
cd Revista_Front/frontend
npm run dev
# La aplicación estará en http://localhost:5173
```

### Acceder a la Aplicación
1. Abrir navegador en `http://localhost:5173`
2. Iniciar sesión con las credenciales admin:
   - **Username**: `admin`
   - **Password**: `Admin1234`

### Documentación API (Swagger)
Una vez iniciado el backend, acceder a:
```
http://localhost:5000/api-docs
```

---

## 🔌 API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/users/login` | Login de usuario | ❌ |
| POST | `/api/users/register` | Registro de usuario | ❌ |
| POST | `/api/auth/refresh` | Renovar access token | ❌ |
| POST | `/api/auth/logout` | Cerrar sesión | ✅ |
| POST | `/api/auth/forgot-password` | Solicitar reset de contraseña | ❌ |
| POST | `/api/auth/reset-password/:token` | Resetear contraseña | ❌ |

### Usuarios
| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/api/users` | Listar usuarios | ✅ | Admin |
| GET | `/api/users/:id` | Obtener usuario específico | ✅ | Admin/Owner |
| PATCH | `/api/users/:id` | Actualizar usuario | ✅ | Admin/Owner |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ | Admin |

### Artículos
| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/api/articles` | Listar artículos (paginado) | ❌ | - |
| GET | `/api/articles/:id` | Obtener artículo | ❌ | - |
| POST | `/api/articles` | Crear artículo | ✅ | Admin |
| PATCH | `/api/articles/:id` | Actualizar artículo | ✅ | Admin |
| DELETE | `/api/articles/:id` | Eliminar artículo | ✅ | Admin |
| POST | `/api/articles/:id/comments` | Añadir comentario | ✅ | User/Admin |
| DELETE | `/api/articles/:id/comments/:commentId` | Eliminar comentario | ✅ | Admin/Owner |

### Parámetros de Paginación
```
GET /api/articles?page=1&limit=10
```

### Ejemplo de Request
```bash
# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin1234"
  }'

# Crear artículo (con token)
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_access_token>" \
  -d '{
    "title": "Mi Artículo",
    "content": "Contenido del artículo...",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

---

## 🧪 Testing con Cypress

### Configuración de Cypress

El proyecto incluye una suite completa de tests E2E que cubren:
- ✅ Login de usuarios
- ✅ Registro de nuevos usuarios
- ✅ Recuperación de contraseña
- ✅ CRUD de artículos (Admin)
- ✅ Gestión de usuarios (Admin)
- ✅ Sistema de comentarios

### Ejecutar Tests

#### Modo Interactivo (Recomendado para desarrollo)
```bash
cd Revista_Front/frontend
npx cypress open
```
Esto abrirá la interfaz de Cypress donde puedes:
1. Seleccionar "E2E Testing"
2. Elegir un navegador
3. Ejecutar tests individuales o todos

#### Modo Headless (Para CI/CD)
```bash
npm run cypress:run
```

### Estructura de Tests

```
cypress/
├── e2e/
│   ├── testLogin.cy.js          # Tests de login
│   ├── auth_security.cy.js      # Tests de autenticación
│   ├── articles.cy.js           # Tests CRUD artículos
│   └── users.cy.js              # Tests gestión usuarios
└── support/
    ├── commands.js              # Comandos personalizados
    └── e2e.js                   # Configuración global
```

### Solución de Problemas Comunes en Cypress

#### ❌ Error: "Selector no encuentra elemento"
**Solución**: Asegurarse de que:
1. El backend está corriendo (`npm start` en backend)
2. El frontend está corriendo (`npm run dev` en frontend)
3. La base de datos está accesible
4. El usuario admin existe (ejecutar `node seedAdmin.js`)

#### ❌ Error: "Timeout esperando respuesta de API"
**Solución**: 
- Verificar que el servidor backend responde en `http://localhost:5000`
- Incrementar timeouts en `cypress.config.js`:
```javascript
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
});
```

#### ❌ Error: "CORS blocked"
**Solución**: Verificar en `server.js` que CORS permite localhost:5173:
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));
```

---

## 🚀 Testing de Rendimiento (JMeter)

Para garantizar que la aplicación soporte una alta concurrencia en producción, hemos implementado pruebas de carga utilizando **Apache JMeter**.

### Escenarios de Prueba
El plan `performance_test.jmx` valida dos perfiles críticos:

1.  **Visitantes (Lectura Masiva)**:
    - **Simulación**: 50 usuarios concurrentes solicitando el feed de artículos.
    - **Endpoint**: `GET /api/articles`
    - **Objetivo**: Asegurar latencia < 500ms bajo carga.

2.  **Administradores (Operaciones Críticas)**:
    - **Simulación**: 10 administradores realizando login simultáneamente y consultando usuarios.
    - **Flujo**: Login -> Token Extraction -> `GET /api/users`.
    - **Objetivo**: Validar integridad de sesiones y manejo de tokens bajo estrés.

### Cómo Ejecutar las Pruebas

#### Requisitos
- Java JRE 8+
- Apache JMeter

#### Ejecución (CLI)
```bash
cd performance_tests
jmeter -n -t performance_test.jmx -l resultados.jtl
```

#### Interpretación de Métricas
- **Latencia**: Tiempo de respuesta desde que sale el request hasta que llega el primer byte.
- **Throughput (TPS)**: Transacciones por segundo.
- **% Error**: Debe mantenerse en 0%. Si sube, revisar logs de `Rate Limiting` en backend.

---

## 🛡️ Seguridad

### Implementaciones de Seguridad

#### 1. Autenticación JWT con Doble Token
- **Access Token**: Expira en 15-30 minutos, se envía en cada request
- **Refresh Token**: Expira en 7 días, almacenado en DB, se usa para renovar access tokens

#### 2. Hashing de Contraseñas
- Bcrypt con salt rounds = 10
- Las contraseñas nunca se almacenan en texto plano

#### 3. Protección de Headers (Helmet)
- XSS Protection
- Content Security Policy
- HSTS
- NoSniff
- Frame protection

#### 4. Rate Limiting
- Desarrollo: 1000 requests / 15 min
- Producción: 100 requests / 15 min

#### 5. Validación y Sanitización
- XSS Clean: Elimina scripts maliciosos
- MongoDB Sanitize: Previene NoSQL injection
- HPP: Previene parameter pollution

#### 6. CORS Restrictivo
Solo permite requests de:
- `http://localhost:5173` (desarrollo)
- Tu dominio de producción (configurar en `.env`)

### Best Practices Implementadas

✅ Variables sensibles en `.env` (nunca en código)  
✅ `.env` en `.gitignore`  
✅ Validación de roles antes de operaciones críticas  
✅ Tokens en headers (no en URL)  
✅ HTTPS en producción  
✅ SQL injection protection (Sequelize ORM)  
✅ Límite de tamaño de request body (10kb)  

---

## 🌐 Deployment

### Opción 1: Vercel + Render (Recomendado - Gratis)

#### Backend en Render
1. Crear cuenta en [Render.com](https://render.com)
2. Nuevo Web Service
3. Conectar repositorio GitHub
4. Configuración:
   - **Root Directory**: `Revista_Back/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Variables de entorno (copiar de `.env.example`)
6. Añadir MongoDB Atlas (gratis)

#### Frontend en Vercel
1. Crear cuenta en [Vercel.com](https://vercel.com)
2. Importar repositorio
3. Configuración:
   - **Root Directory**: `Revista_Front/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Variable de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```

### Opción 2: Docker (Avanzado)

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./Revista_Back/backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    depends_on:
      - mysql
      - mongodb

  frontend:
    build: ./Revista_Front/frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: filco

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
```

---

## 🔧 Solución de Problemas

### Backend no inicia

#### Error: "Cannot connect to MySQL"
```bash
# Verificar que MySQL está corriendo
mysql -u root -p

# En Windows (PowerShell como Admin)
net start MySQL80

# En Linux/Mac
sudo systemctl start mysql
```

#### Error: "MongoDB connection failed"
```bash
# Verificar MongoDB
mongosh

# Iniciar MongoDB (Windows)
net start MongoDB

# Iniciar MongoDB (Linux/Mac)
sudo systemctl start mongod
```

#### Error: "Port 5000 already in use"
```bash
# Windows - Encontrar y matar proceso
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Frontend no inicia

#### Error: "VITE_API_URL not defined"
Crear archivo `.env` en `Revista_Front/frontend`:
```
VITE_API_URL=http://localhost:5000
```

#### Error: "Cannot GET /"
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Tests de Cypress Fallan

#### Problema: "Login test fails"
1. Verificar backend corriendo: `http://localhost:5000`
2. Verificar frontend corriendo: `http://localhost:5173`
3. Crear usuario admin:
   ```bash
   cd Revista_Back/backend
   node seedAdmin.js
   ```

#### Problema: "Element not found"
- Esperar que la página cargue completamente
- Aumentar timeouts en los tests
- Verificar que los selectores coinciden con los componentes

#### Problema: "API request timed out"
- Verificar CORS en backend
- Verificar que el servidor responde: `curl http://localhost:5000`
- Revisar logs del servidor

---

## 📞 Contacto y Soporte

### Generar Logs para Debug

#### Backend
```bash
# Logs detallados
DEBUG=* npm start > backend.log 2>&1
```

#### Frontend
```bash
# Abrir consola del navegador (F12)
# Pestaña Console y Network
```

#### Cypress
```bash
# Tests con videos y screenshots
npx cypress run --record --key <tu_key>
```

---

## 📝 Notas Adicionales

### Datos de Prueba

**Usuario Admin por defecto**:
- Username: `admin`
- Password: `Admin1234`
- Role: `admin`

### Comandos Útiles

```bash
# Backend
npm start                # Iniciar servidor
npm run dev             # Iniciar con nodemon (auto-reload)
node seedAdmin.js       # Crear usuario admin

# Frontend
npm run dev             # Dev server con HMR
npm run build           # Build para producción
npm run preview         # Preview build de producción
npm run lint            # Linter
npm run cypress:open    # Cypress interactivo
npm run cypress:run     # Cypress headless

# Documentación
npm run doc             # Generar docs JSDoc
```

### Puertos Utilizados
- Frontend: `5173` (Vite)
- Backend: `5000` (Express)
- MySQL: `3306`
- MongoDB: `27017`

---

## 🤖 CI/CD Pipeline (GitHub Actions)

El proyecto cuenta con un sistema de Integración Continua profesional definido en `.github/workflows/ci.yml`.

### Stages del Pipeline

#### 1. Backend Integrity Check
- **Instalación Limpia**: Usa `npm ci` para respetar estrictamente `package-lock.json`.
- **Análisis Estático**: Verifica que el código del servidor (`server.js`) sea sintácticamente correcto antes de desplegar.

#### 2. Frontend Quality Guard
- **Linter Estricto**: Ejecuta `ESLint` para detectar errores potenciales y asegurar consistencia de código (Reglas React Hooks + Standard).
- **Build de Producción**: Simula el proceso de compilación de Vite (`npm run build`) para detectar errores que solo ocurren al minificar el código.

> **Nota**: Este pipeline se ejecuta automáticamente en cada `push` o `pull_request` a las ramas `main` o `master`.

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Última actualización**: 2026-01-26
**Estado**: 🟢 Stable / Production Ready
**Versión**: 1.1.0 (Performance Update)
