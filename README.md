# 🦅 Filosofía&Co (FILCO) - Fullstack Web Application (Senior Grade)

Bienvenido a **Filosofía&Co**, una plataforma profesional de alta gama diseñada para la gestión, lectura y administración de contenido cultural. Este proyecto ha sido transformado desde una base académica a una aplicación de nivel empresarial, implementando patrones de diseño avanzados, seguridad multicapa y una arquitectura escalable.

---

## 🚀 Mejoras de Ingeniería Implementadas

### **1. 🔐 Seguridad Senior & Autenticación**
- **Doble Sistema de Tokens (Refresh Tokens)**: Implementación de **Access Tokens** (de corta duración) y **Refresh Tokens** (de larga duración, almacenados en DB) para sesiones infinitas seguras sin pedir login constante.
- **Auto-Renovación Transparente**: El frontend incluye un interceptor (`fetchWithAuth`) que renueva el token automáticamente cuando expira, sin interrumpir al usuario.
- **Blindaje de API**:
  - **Helmet**: Cabeceras de seguridad HTTP completas.
  - **Rate Limiting**: Limitación de peticiones por IP para prevenir ataques de fuerza bruta y DoS.
  - **XSS & NoSQL Injection**: Sanitización total de todas las entradas del usuario.
  - **HPP**: Protección contra contaminación de parámetros.

### **2. �️ Arquitectura Dual de Bases de Datos**
- **MySQL (Sequelize)**: Gestiona la estructura relacional de los **Usuarios y Roles**, garantizando integridad referencial.
- **MongoDB (Mongoose)**: Maneja los **Artículos y Contenido** de forma flexible y escalable, permitiendo metadatos variables.

### **3. � Escalabilidad & Performance**
- **Paginación Backend**: La API de artículos soporta paginación real (`limit` y `page`), evitando sobrecargar la red.
- **Carga Optimizada**: El frontend solicita solo el contenido necesario (Ej: los 6 artículos más recientes en Home).
- **Hybrid Configuration**: El código detecta automáticamente si estás en `local` o `producción`, configurando las bases de datos y la API sin intervención manual.

### **4. 🛡️ Experiencia de Usuario (UX) e Interfaz**
- **Rutas Protegidas**: Sistema de seguridad en el cliente que bloquea paneles de administración basándose en el rol del JWT.
- **Sistema de Toasts**: Feedback visual premium con `react-hot-toast` para todas las acciones CRUD.
- **Gestión de Imágenes**: Soporte para URLs dinámicas con previsualización en el panel de administrador.
- **Confirmación de Seguridad**: Diálogos de confirmación antes de eliminaciones críticas.

---

## 🧪 Calidad, Testing y Documentación
- **Selenium/Cypress**: Suite completa de **Tests End-to-End** que verifican el Login, Registro y CRUD de artículos.
- **Documentación API**: Totalmente integrada con **Swagger** (disponible en `/api-docs`).
- **JSDoc**: Código documentado bajo el estándar de JavaScript de Google.
- **CI/CD Pipeline**: Configurado vía **GitHub Actions** para pasar tests y validar el build automáticamente en cada push.

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite, React Router 7, React Hot Toast |
| **Backend** | Node.js, Express, Sequelize, Mongoose |
| **Seguridad** | JWT, Refresh Tokens, Bcrypt, Helmet, XSS-Clean |
| **Bases de Datos** | MariaDB/MySQL, MongoDB Atlas |
| **DevOps** | GitHub Actions, Vercel (Front), Render (Back) |

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
*Proyecto finalizado con arquitectura profesional para el portafolio de Desarrollo Web.*
