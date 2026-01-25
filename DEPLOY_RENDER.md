# Guía de Despliegue en Render 🚀

Esta guía te ayudará a desplegar tanto el **Backend** como el **Frontend** de FILCO en Render.

---

## 📦 Paso 1: Crear el Servicio de Backend

1. Ve a [render.com](https://render.com) e inicia sesión.
2. Click en **"New +"** → **"Web Service"**.
3. Conecta tu repositorio de GitHub: `Kevinanillo23/-Proyect_filo`.
4. Configura el servicio:

| Campo | Valor |
|-------|-------|
| **Name** | `filco-backend` |
| **Root Directory** | `Revista_Back/backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

5. En la sección **Environment Variables**, añade las siguientes variables:

```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/revista
JWT_SECRET=tu_clave_secreta_muy_segura
JWT_REFRESH_SECRET=otra_clave_segura_para_refresh
FRONTEND_URL=https://filco-frontend.onrender.com
```

> ⚠️ **Importante**: Sustituye `usuario:password` por tus credenciales reales de MongoDB Atlas.

6. Click en **"Create Web Service"**.

---

## 🎨 Paso 2: Crear el Servicio de Frontend (Static Site)

1. Click en **"New +"** → **"Static Site"**.
2. Conecta el mismo repositorio.
3. Configura el servicio:

| Campo | Valor |
|-------|-------|
| **Name** | `filco-frontend` |
| **Root Directory** | `Revista_Front/frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4. En **Environment Variables**, añade:

```
VITE_API_URL=https://filco-backend.onrender.com
```

5. Click en **"Create Static Site"**.

---

## 🔗 Paso 3: Configurar las URLs Cruzadas

Una vez desplegados ambos servicios, actualiza las variables de entorno:

### En el Backend (`filco-backend`):
- `FRONTEND_URL` = La URL real del frontend (ej: `https://filco-frontend.onrender.com`)

### En el Frontend (`filco-frontend`):
- `VITE_API_URL` = La URL real del backend (ej: `https://filco-backend.onrender.com`)

---

## ✅ Verificación

1. Abre la URL del **Backend** en tu navegador. Deberías ver:
   ```
   API Revista Online - Backend Corriendo 🚀
   ```

2. Abre la URL del **Frontend**. La aplicación debería cargar correctamente.

3. Prueba el login con las credenciales de administrador.

---

## 🗄️ Nota sobre MySQL

Actualmente el proyecto usa MySQL local. Para producción en Render, tienes dos opciones:

1. **PlanetScale** (Gratuito): Base de datos MySQL serverless compatible.
2. **Railway** (Gratuito): Hosting de MySQL con plan free.

Una vez tengas la URL de conexión, añade estas variables al Backend:

```
DB_HOST=tu-host-mysql.com
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=filco
DB_DIALECT=mysql
```

---

¡Tu aplicación FILCO estará lista para impresionar a los reclutadores! 🎉
