# 🦅 Filosofía&Co (FILCO) - Enterprise Grade Web Application
[![CI Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square&logo=github)](https://github.com/Kevinanillo23/-Proyect_filo/actions)
[![Code Quality](https://img.shields.io/badge/code%20quality-A-blue?style=flat-square)](https://sonarcloud.io/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)
[![React Version](https://img.shields.io/badge/react-19.1.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node Version](https://img.shields.io/badge/node->=18-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)

Bienvenido a **Filosofía&Co**, una plataforma profesional de alta gama diseñada para la gestión, lectura y administración de contenido cultural. Este proyecto ha sido transformado desde una base académica a una aplicación de nivel empresarial, implementando patrones de diseño avanzados, seguridad multicapa y una arquitectura escalable lista para producción.

---

## 🚀 Ingeniería & Arquitectura

### **1. 🔐 Seguridad Senior & Autenticación**
- **Doble Sistema de Tokens (Refresh Tokens)**: Implementación de **Access Tokens** (de corta duración) y **Refresh Tokens** (de larga duración, almacenados en DB) para sesiones infinitas seguras sin pedir login constante.
- **Auto-Renovación Transparente**: El frontend incluye un interceptor (`fetchWithAuth`) que renueva el token automáticamente cuando expira, sin interrumpir al usuario.
- **Blindaje de API**:
  - **Helmet**: Cabeceras de seguridad HTTP completas.
  - **Rate Limiting**: Limitación de peticiones por IP para prevenir ataques de fuerza bruta y DoS.
  - **XSS & NoSQL Injection**: Sanitización total de todas las entradas del usuario.
  - **HPP**: Protección contra contaminación de parámetros.

### **2. 🗄️ Arquitectura Dual de Bases de Datos**
- **MySQL (Sequelize)**: Gestiona la estructura relacional de los **Usuarios y Roles**, garantizando integridad referencial ACID.
- **MongoDB (Mongoose)**: Maneja los **Artículos y Contenido** de forma flexible y escalable (Schema-less), permitiendo metadatos variables y arrays de comentarios de alto volumen.

### **3. ⚡ Escalabilidad & Performance**
- **Paginación Backend**: La API de artículos soporta paginación real (`limit` y `page`), evitando sobrecargar la red.
- **Carga Optimizada**: El frontend solicita solo el contenido necesario (Lazy Loading).
- **Hybrid Configuration**: El código detecta automáticamente el entorno (`local`, `test`, `production`), configurando las bases de datos y la API sin intervención manual.

### **4. 🛡️ Experiencia de Usuario (UX) Premium**
- **Diseño Glassmorphism**: Interfaz moderna con efectos de desenfoque (`backdrop-filter`) y transparencias.
- **Buscador Inteligente**: Búsqueda en tiempo real con lógica *fuzzy* para resultados aproximados.
- **Interacción Social**: Sistema de **Comentarios** completo en tiempo real.
- **Feedback Visual**: Notificaciones Toast (`react-hot-toast`) y transiciones suaves.

### **5. 🔍 SEO y Visibilidad**
- **Meta Etiquetas Avanzadas**: Implementación de Open Graph y Twitter Cards.
- **Semántica HTML5**: Estructura optimizada para motores de búsqueda y accesibilidad (A11y).

---

## 🧪 Quality Assurance (QA) & Testing

### 1. Pruebas End-to-End (Cypress)
Suite completa de tests automatizados que simula el comportamiento del usuario real:
- **Auth Flow**: Login, Registro, Recuperación de contraseña.
- **Core Features**: CRUD de artículos, Gestión de comentarios, Administración de usuarios.
- **Reportes**: Generación automática de videos y capturas de falla.

### 2. Pruebas de Carga y Estrés (JMeter) 🚀
Hemos validado la robustez de la API utilizando **Apache JMeter** para simular tráfico concurrente:
- **Escenario**: 50-100 usuarios concurrentes accediendo a artículos y realizando logins simultáneos.
- **Resultados**: Latencia promedio < 200ms y 0% de tasa de error bajo carga.
- **Archivos**: El plan de pruebas se encuentra en `performance_tests/performance_test.jmx`.

![JMeter Test Plan](./performance_tests/jmeter_preview_placeholder.png)

### 3. CI/CD Pipeline
Pipeline de GitHub Actions configurado para integración continua:
- **Linting Automático**: Verifica estilo de código y previene errores en el frontend.
- **Build Verification**: Asegura que la aplicación compila correctamente antes de cualquier merge.
- **Dependency Check**: Valida la integridad de `package-lock.json` en ambos entornos.

---

## 📚 Documentación Técnica
- **[DOCUMENTACION_COMPLETA.md](./DOCUMENTACION_COMPLETA.md)**: La "Biblia" del proyecto. Incluye arquitectura detallada, diagramas de flujo, endpoints y guías de despliegue.
- **[GUIA_JMETER.md](./performance_tests/README_JMETER.md)**: Instrucciones específicas para reproducir las pruebas de carga.

---

## 🛠️ Stack Tecnológico Actual

| Dominio | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite, React Router 7, Tailwind (Glassmorphism), React Hot Toast |
| **Backend** | Node.js 20, Express 5, Sequelize, Mongoose |
| **Seguridad** | JWT (Access/Refresh), Bcrypt, Helmet, Express-Rate-Limit, XSS-Clean |
| **Data Layer** | MariaDB/MySQL 8 (Relacional), MongoDB Atlas (Documental) |
| **QA & Testing** | Cypress (E2E), Apache JMeter (Load Testing), GitHub Actions (CI) |
| **DevOps** | Render (Back), Vercel (Front), Docker Ready |

---

## 💻 Guía de Despliegue (Costo $0)

Este proyecto está listo para ser desplegado en **Vercel** y **Render** en menos de 5 minutos:

1.  **Backend (Render)**:
    - Root Directory: `Revista_Back/backend`
    - Configurar variables de `.env.example`.
2.  **Frontend (Vercel)**:
    - Root Directory: `Revista_Front/frontend`
    - Variable `VITE_API_URL` apuntando a Render.

---

## 💻 Desarrollo Local
Si quieres probarlo en local, solo necesitas clonar y hacer `npm install`. Gracias a los **fallbacks** que he implementado, se conectará a tu MySQL y MongoDB local por defecto sin necesidad de configurar nada extra.

---
