# Filosofía&Co (FILCO) - Full Stack Web Application

[![CI Status](https://github.com/Kevinanillo23/-Proyect_filo/actions/workflows/deploy-validation.yml/badge.svg)](https://github.com/Kevinanillo23/-Proyect_filo/actions)
[![React Version](https://img.shields.io/badge/react-19.1.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node Version](https://img.shields.io/badge/node->=18-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-5.1.0-000000?style=flat-square&logo=express)](https://expressjs.com/)

Filosofía&Co es una plataforma web monorepo que implementa una arquitectura MVC robusta, seguridad multicapa y una infraestructura de contenedores lista para producción.

## Despliegue

* **Frontend:** [https://proyect-filo.vercel.app/](https://proyect-filo.vercel.app/)
* **API Backend:** [https://proyect-filo.onrender.com](https://proyect-filo.onrender.com)

---

## Arquitectura y Diseño

### Estructura del Proyecto (MVC)
El backend está organizado siguiendo el patrón Modelo-Vista-Controlador para asegurar la separación de responsabilidades:
- **Middleware:** Gestión de seguridad, autenticación y errores.
- **Controllers:** Lógica de negocio modularizada.
- **Models:** Esquemas SQL (Sequelize) y NoSQL (Mongoose).
- **Routes:** Definición de endpoints con protección de roles.

### Seguridad
- **Autenticación:** Sistema de doble token JWT (Access + Refresh).
- **Protección:** Helmet.js, Rate Limiting, y sanitización de datos (XSS, NoSQL Injection).
- **Encriptación:** Hasheo de credenciales con Bcrypt.

### Infraestructura (Kubernetes & Docker)
El proyecto incluye soporte nativo para contenedores:
- **Docker:** Build multi-stage optimizado para producción.
- **Compose:** Orquestación local de API, MySQL y MongoDB.
- **Kubernetes:** Manifiestos para Deployment (RollingUpdate) y Service.

---

## Testing y Calidad

### Pruebas E2E (Cypress)
Suite automatizada que cubre los flujos principales:
- Autenticación y registro seguro.
- Gestión administrativa de artículos y usuarios.
- Motores de búsqueda y navegación.

### Pruebas de Carga (JMeter)
Validación de rendimiento bajo condiciones de tráfico concurrente:
- **Configuración:** `performance_tests/performance_test.jmx`
- **Resultados:** Latencia estable < 200ms en flujos críticos.

---

## Stack Tecnológico

| Dominio | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite, React Router, Glassmorphism UI |
| **Backend** | Node.js, Express 5, Sequelize, Mongoose |
| **Bases de Datos** | MySQL 8 (Datos Relacionales), MongoDB Atlas (Documentos) |
| **DevOps** | Docker, Kubernetes, GitHub Actions (CI) |

---

## Desarrollo Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/Kevinanillo23/-Proyect_filo.git
```

2. **Servidor Backend**
```bash
cd Revista_Back/backend
npm install
npm run dev
```

3. **Frontend**
```bash
cd Revista_Front/frontend
npm install
npm run dev
```

---

**Autor:** Kevin Anillo Coba  
**LinkedIn:** [linkedin.com/in/kevin-anillo-coba](https://linkedin.com/in/kevin-anillo-coba)
