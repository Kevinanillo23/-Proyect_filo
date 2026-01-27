const express = require("express");
const sequelize = require("./config/db");
const connectMongoDB = require("./config/mongo"); // Use the updated config file
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const securitySanitizer = require("./Middleware/security");
const errorHandler = require("./Middleware/errorHandler"); // Assuming we create/use this or extract it
const setupSwagger = require("./config/swagger");
require("dotenv").config();

// Routes
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/auth");

const app = express();

// --- Security Middleware ---

// 1. CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// 2. HTTP Headers & Parsing
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

// 3. Custom Sanitization
app.use(securitySanitizer);

// 4. Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 2000,
  message: "Too many requests from this IP",
});
app.use("/api", globalLimiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 10 : 1000,
  message: "Too many login attempts",
});
app.use("/api/users/login", authLimiter);
app.use("/api/users/register", authLimiter);

// --- Database Connections ---

// Connect MySQL
const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ MySQL Connected");
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  }
}
connectMySQL();

// Connect MongoDB
connectMongoDB();

// --- Routes ---

app.get("/", (req, res) => {
  res.send("API Revista Online - Running");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Swagger
setupSwagger(app);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});