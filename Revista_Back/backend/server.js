// server.js
const express = require("express");
const sequelize = require("./config/db");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
require("dotenv").config();

// Rutas
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/auth");
const setupSwagger = require("./config/swagger");

const app = express();

/**
 * SEGURIDAD PRO - Middlewares de protección
 */

// 1. Helmet: Cabeceras de seguridad HTTP
app.use(helmet());

// 2. CORS: Configuración restringida
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 3. Rate Limiting: Evitar ataques de fuerza bruta y DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP en ese tiempo
  message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos"
});
app.use("/api/", limiter);

// 4. Body Parser: Limitar el tamaño de los datos de entrada
app.use(express.json({ limit: "10kb" }));

// 5. HPP: Prevenir contaminación de parámetros HTTP
app.use(hpp());

/**
 * Conexión a MySQL usando Sequelize.
 *
 * @async
 * @function connectMySQL
 * @returns {Promise<void>} Conecta y sincroniza las tablas en MySQL.
 */
const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con MySQL");
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas en MySQL");
  } catch (err) {
    console.error("Error al conectar con MySQL:", err);
  }
};
connectMySQL();

/**
 * Conexión a MongoDB usando Mongoose.
 *
 * @async
 * @function connectMongoDB
 * @returns {Promise<void>} Conecta con la base de datos MongoDB.
 */
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/revista", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión establecida con MongoDB");
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err);
  }
};
connectMongoDB();

/**
 * Ruta raíz de prueba
 * @route GET /
 * @returns {string} Mensaje de confirmación de que el backend está corriendo.
 */
app.get("/", (req, res) => {
  res.send("Backend con Sequelize (MySQL) y MongoDB listo");
});

/**
 * Rutas principales de la API
 */
app.use("/api/users", userRoutes);        // Gestión de usuarios
app.use("/api/auth", authRoutes);         // Login / Logout / Me
app.use("/api/articles", articleRoutes);  // CRUD artículos

/**
 * Configuración de Swagger (documentación de la API)
 */
setupSwagger(app);

/**
 * Manejador de errores global
 * Protege de fugas de información en producción
 */
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production"
    ? "Ocurrió un error interno en el servidor"
    : err.message;

  res.status(statusCode).json({
    status: "error",
    message: message
  });
});

/**
 * Inicialización del servidor
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
