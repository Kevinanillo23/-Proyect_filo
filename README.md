# 🦅 Filosofía&Co (FILCO) - Fullstack Web Application

Bienvenido a **Filosofía&Co**, una plataforma profesional diseñada para la gestión y lectura de artículos filosóficos, podcasts y recursos culturales. Esta aplicación ha sido desarrollada siguiendo estándares modernos de seguridad, arquitectura de bases de datos y experiencia de usuario.

---

## 🚀 Características Principales

### **Frontend (React 19 + Vite)**
- **🎨 Interfaz Premium**: Diseño moderno y minimalista enfocado en la lectura, con feedback visual mediante `react-hot-toast`.
- **🛡️ Seguridad en el Cliente**: Sistema de **Rutas Protegidas** que impide el acceso no autorizado a paneles de administración.
- **📱 Responsive Design**: Totalmente adaptado para dispositivos móviles con menús interactivos.
- **🔄 Gestión Dinámica**: CRUD completo de artículos y usuarios con previsualización de imágenes y confirmaciones de seguridad.

### **Backend (Node.js + Express)**
- **🏰 Arquitectura de Datos Dual**: 
  - **MySQL (Sequelize)**: Gestión robusta de usuarios y roles.
  - **MongoDB (Mongoose)**: Almacenamiento flexible y escalable de artículos y contenido.
- **🛡️ Blindaje de API**:
  - **Helmet**: Cabeceras de seguridad HTTP.
  - **Rate Limiting**: Protección contra ataques de fuerza bruta.
  - **Sanitización**: Defensa contra Inyecciones NoSQL y ataques XSS.
- **📧 Autenticación Avanzada**: Login con **JWT**, Hasheo de contraseñas con **Bcrypt** y sistema de recuperación por email (Nodemailer).

### **Calidad y Documentación**
- **🧪 Testing E2E**: Suite completa de pruebas con **Cypress** (Login, Registro, CRUD Artículos y Seguridad).
- **📖 Documentación**: API totalmente documentada con **Swagger** y código comentado con **JSDoc**.

---

## 🛠️ Tecnologías Utilizadas

| Stack | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite, React Router 7, React Hot Toast, CSS3 Moderno |
| **Backend** | Node.js, Express, Sequelize, Mongoose |
| **Bases de Datos** | MySQL, MongoDB |
| **Testing** | Cypress |
| **Seguridad** | JWT, Bcrypt, Helmet, Express-Rate-Limit, XSS-Clean |

---

## 💻 Instalación Local

### Requisitos Previos
- Node.js instalado.
- Instancias de MySQL y MongoDB corriendo localmente.

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd practicas
```

### 2. Configurar el Backend
```bash
cd Revista_Back/backend
npm install
# Crea un archivo .env basado en la configuración del servidor
npm start
```

### 3. Configurar el Frontend
```bash
cd ../../Revista_Front/frontend
npm install
npm run dev
```

---

## 🧪 Ejecutar Tests
Para asegurar que todo funciona correctamente:
```bash
# Dentro de la carpeta frontend
npm run cypress:open
```

---

## 🌐 Despliegue
Esta aplicación está preparada para ser desplegada en **Vercel** (Frontend) y **Render** (Backend), utilizando **MongoDB Atlas** y servicios de MySQL en la nube para una disponibilidad del 100% sin costes.

---

Desarrollado con  para las prácticas de Desarrollo Web.
