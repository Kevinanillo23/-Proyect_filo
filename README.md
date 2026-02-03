# 🦅 Filosofía&Co (FILCO) - Enterprise Grade Web Application

[![CI Status](https://github.com/Kevinanillo23/-Proyect_filo/actions/workflows/deploy-validation.yml/badge.svg)](https://github.com/Kevinanillo23/-Proyect_filo/actions)
[![React Version](https://img.shields.io/badge/react-19.1.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node Version](https://img.shields.io/badge/node->=18-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-5.1.0-000000?style=flat-square&logo=express)](https://expressjs.com/)

Bienvenido a **Filosofía&Co**. Este proyecto es la demostración real de mi capacidad para transformar una aplicación base en una **solución de nivel empresarial**. Aquí aplico todo mi arsenal técnico: arquitecturas escalables, seguridad multicapa, documentación exhaustiva y un pipeline de validación profesional.

---

## 🌐 Demo & Despliegue en Vivo
La plataforma se encuentra totalmente operativa y lista para ser testeada:

* **🚀 Frontend (UI):** [https://proyect-filo.vercel.app/](https://proyect-filo.vercel.app/)
* **⚙️ Backend (API):** [https://proyect-filo.onrender.com](https://proyect-filo.onrender.com)

---

## 🧐 El Desafío Técnico: De Prototipo a Enterprise
El objetivo de FILCO fue elevar un desarrollo sencillo a estándares de producción reales, destacando en:

* **Estructura MVC Pura:** Organización lógica del backend separando Models, Controllers y Routes.
* **Documentación Integral:** Cada proceso, endpoint y componente está documentado para facilitar el escalado.
* **CI con GitHub Actions:** Automatización total de la validación de código (Lint + Build).
* **Seguridad Defensiva:** Blindaje avanzado de API y gestión de sesiones con doble token.

---

## � Ingeniería & Arquitectura

### **1. 🏗️ Estructura de Software (Patrón MVC)**
El backend sigue el estándar **Modelo-Vista-Controlador**, asegurando un código desacoplado y mantenible:
```
Revista_Back/backend/
├── Middleware/        # Seguridad, Auth, Error Handling
├── controllers/       # Lógica de negocio (User, Article, Auth)
├── models/            # Esquemas SQL (Sequelize) y NoSQL (Mongoose)
├── routes/            # Enrutamiento modular con middlewares
├── config/            # Configuración de DBs y entorno
└── utils/             # Helpers (mailer, validators)
```

### **2. 📚 Documentación Técnica Completa**
Para garantizar la excelencia técnica, el proyecto cuenta con:
- **[DOCUMENTACION_COMPLETA.md](./DOCUMENTACION_COMPLETA.md):** Arquitectura, diagramas, seguridad y flujos de datos.
- **[GUIA_JMETER.md](./performance_tests/README_JMETER.md):** Instrucciones para reproducir pruebas de carga.
- **JSDoc:** Código backend documentado con anotaciones profesionales.

### **3. 🔄 CI/CD & Automatización (GitHub Actions)**
Pipeline configurado para validación automática en cada push a `main`:
- **Linting (ESLint):** Verificación de estilo y errores de código.
- **Build Verification:** Asegura que la aplicación compila correctamente antes de merge.
- **Syntax Check:** Valida la integridad del servidor Node.js.

### **4. � Seguridad Senior & Autenticación**
Implementación de múltiples capas de defensa:

| Capa | Tecnología | Propósito |
|---|---|---|
| **Autenticación** | JWT (Access + Refresh Tokens) | Sesiones seguras y persistentes |
| **Encriptación** | Bcrypt (salt rounds) | Hash de contraseñas |
| **Headers** | Helmet.js | Cabeceras HTTP seguras |
| **Rate Limiting** | express-rate-limit | Prevención de DoS y fuerza bruta |
| **Sanitización** | xss-clean, express-mongo-sanitize, custom middleware | Prevención de XSS y NoSQL Injection |
| **Params** | HPP | Protección contra contaminación HTTP |

### **5. �️ Arquitectura Dual de Bases de Datos**
Estrategia políglota optimizada para cada tipo de dato:

| Motor | ORM | Uso | Justificación |
|---|---|---|---|
| **MySQL/MariaDB** | Sequelize | Usuarios, Roles, Tokens | Integridad ACID, relaciones FK |
| **MongoDB Atlas** | Mongoose | Artículos, Comentarios | Flexibilidad, escalabilidad horizontal |

---

## 🧪 Quality Assurance (QA) & Testing

### 1. Pruebas End-to-End (Cypress) 🧪
Suite automatizada de **5 archivos de tests** que validan los flujos críticos:
- `auth_security.cy.js` - Login, Registro, Seguridad de rutas
- `articles.cy.js` - CRUD completo de artículos
- `users.cy.js` - Gestión de usuarios (Admin)
- `search.cy.js` - Buscador en tiempo real
- `testLogin.cy.js` - Flujo de autenticación

### 2. Pruebas de Carga (JMeter) 🚀
Validación de robustez simulando **50-100 usuarios concurrentes**:
- **Latencia promedio:** < 200ms
- **Tasa de error:** 0%
- **Plan de pruebas:** `performance_tests/performance_test.jmx`

---

## ️ Stack Tecnológico Verificado

| Dominio | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite 7, React Router 7, CSS3 Glassmorphism, React Hot Toast |
| **Backend** | Node.js >=18, Express 5, Sequelize, Mongoose |
| **Seguridad** | JWT (Access/Refresh), Bcrypt, Helmet, express-rate-limit, xss-clean, hpp |
| **Data Layer** | MariaDB/MySQL 8 (Relacional), MongoDB Atlas (Documental) |
| **QA & Testing** | Cypress 15 (E2E), Apache JMeter (Load Testing) |
| **DevOps** | GitHub Actions (CI), Vercel (Front), Render (Back) |

---

## 🌍 Sobre el Autor: Kevin Anillo Coba
**Desarrollador Full-Stack** con experiencia internacional (2 años en UK).
- **Enfoque:** Arquitecturas escalables, Seguridad de APIs, Clean Code.
- **Visión:** Aplicar eficiencia operativa al desarrollo de software moderno.
- **LinkedIn:** [linkedin.com/in/kevin-anillo-coba](https://linkedin.com/in/kevin-anillo-coba)
- **GitHub:** [github.com/Kevinanillo23](https://github.com/Kevinanillo23)

---

## 💻 Desarrollo Local
```bash
git clone https://github.com/Kevinanillo23/-Proyect_filo.git

# Backend
cd Revista_Back/backend
npm install
# Configura .env basándote en .env.example
npm run dev

# Frontend (en otra terminal)
cd Revista_Front/frontend
npm install
npm run dev
```

Gracias a los **fallbacks** implementados, la app conecta a DBs locales por defecto si no hay credenciales cloud.

---

*Diseñado con visión de ingeniería. 2026.*
