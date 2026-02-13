# Memoria Técnica: Filosofía&Co (FILCO)

Este documento detalla los aspectos técnicos, de infraestructura y seguridad de **Filosofía&Co**, una aplicación web diseñada con un enfoque en la escalabilidad y la robustez.

---

## 🏗️ Arquitectura de Sistemas

La aplicación utiliza un patrón **MVC (Modelo-Vista-Controlador)** desacoplado en el monorepo, permitiendo una gestión clara de la lógica de negocio y la interfaz de usuario.

### Flujo de Datos
1. **Frontend (React 19)**: Cliente SPA que consume una API RESTful.
2. **Backend (Express 5)**: Servidor de aplicaciones con middleware de seguridad y validación.
3. **Persistencia Dual**:
    - **MySQL (Sequelize)**: Gestión relacional para perfiles de usuario, roles y tokens de sesión (integridad ACID).
    - **MongoDB (Mongoose)**: Gestión documental para artículos y comentarios (flexibilidad y alta velocidad de lectura).

---

## 🔐 Seguridad y Autenticación

### Gestión de Tokens (JWT)
Se ha implementado un sistema de doble token para equilibrar seguridad y experiencia de usuario:
- **Access Token**: Vida corta (1h), viaja en los headers para autorizar peticiones.
- **Refresh Token**: Vida larga (7d), almacenado en la base de datos para la renovación de sesiones.

### Capas de Protección
- **CORS & Helmet**: Configuración de seguridad en cabeceras HTTP.
- **Encryption**: Uso de Bcrypt con salt rounds para el almacenamiento de contraseñas.
- **Rate Limiting**: Protección contra ataques de fuerza bruta en los endpoints de autenticación.
- **Sanitización**: Limpieza activa de payloads para prevenir XSS e inyecciones NoSQL.

---

## ⚙️ Infraestructura y DevOps

### Contenerización (Docker)
- **Multi-stage build**: Proceso de construcción que separa la etapa de compilación del frontend de la imagen de ejecución final, reduciendo el tamaño de la imagen en más de un 60%.
- **No-Root Execution**: El contenedor corre bajo un usuario sin privilegios (`node`) para minimizar riesgos de seguridad.

### Orquestación y Despliegue
- **Docker Compose**: Entorno local que levanta la API y ambas bases de datos con volúmenes persistentes.
- **Kubernetes**: Manifiestos listos para producción con estrategias de `RollingUpdate`, asegurando disponibilidad continua durante las actualizaciones.

---

## 🧪 Control de Calidad

### Pruebas E2E (Cypress)
Suite de pruebas que valida flujos críticos:
- Ciclo de vida del usuario (Registro -> Login -> Reset Password).
- Operaciones CRUD administrativas.
- Búsqueda y filtrado de contenido.

### Pruebas de Carga (JMeter)
Validación de rendimiento con usuarios concurrentes para asegurar tiempos de respuesta consistentes (< 200ms) bajo carga moderada.

---

*Memoria técnica actualizada para entornos de producción. 2026.*
