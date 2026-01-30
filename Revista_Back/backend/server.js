const express = require("express");
const sequelize = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// Eliminamos hpp y xss-clean por incompatibilidad con Express 5 (req.query es solo lectura)
require("dotenv").config();

// Importación de Rutas
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/auth");
const setupSwagger = require("./config/swagger");

const app = express();

/**
 * MIDDLEWARES DE SEGURIDAD (Arquitectura compatible con Express 5)
 */

// 1. CORS Dinámico (Producción + Desarrollo)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL // URL del frontend en Render
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 2. Helmet
app.use(helmet());

// 3. Body Parser
app.use(express.json({ limit: "10kb" }));

// 4. Capa de Sanitización Universal Personalizada (NoSQL + XSS)
// Esta versión NO intenta sobrescribir req.query, solo limpia sus valores
app.use((req, res, next) => {
  const sanitizeValue = (val) => {
    if (typeof val === 'string') {
      return val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return val;
  };

  const traverse = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (key.startsWith("$") || key.includes(".")) {
            delete obj[key];
          } else {
            if (typeof obj[key] === 'string') {
              obj[key] = sanitizeValue(obj[key]);
            } else {
              traverse(obj[key]);
            }
          }
        }
      }
    }
  };

  // Saneamos body y params (son mutables)
  if (req.body) traverse(req.body);
  if (req.params) traverse(req.params);

  // Para query string en Express 5, tratamos de limpiar los valores sin reasignar la propiedad query
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = sanitizeValue(req.query[key]);
      }
    }
  }

  next();
});

// 5. Rate Limiting General
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // Permisivo por defecto en local/desarrollo (2000 req), estricto solo en producción (100 req)
  max: process.env.NODE_ENV === "production" ? 100 : 2000,
  message: "Demasiadas peticiones desde esta IP",
});
app.use("/api", limiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  // Permisivo en local (1000 intentos), estricto en producción (10 intentos)
  max: process.env.NODE_ENV === "production" ? 10 : 1000,
  message: "Demasiados intentos de acceso",
});
app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);

/**
 * CONEXIONES A BASES DE DATOS
 */
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con PostgreSQL (Supabase)");
    await sequelize.sync();
    console.log("✅ Tablas sincronizadas en la base de datos");
  } catch (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  }
};
connectPostgres();

const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/revista";
    await mongoose.connect(mongoURI);
    console.log("✅ Conexión establecida con MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err.message);
  }
};
connectMongoDB();

/**
 * RUTAS Y DOCUMENTACIÓN
 */
app.get("/", (req, res) => {
  res.send("API Revista Online - Backend Corriendo 🚀");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

setupSwagger(app);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error("Error detectado:", err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: process.env.NODE_ENV === "production" ? "Error interno" : err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
});