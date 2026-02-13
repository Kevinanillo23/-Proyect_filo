const express = require("express");
const { connectDB } = require("./config/db");
const connectMongoDB = require("./config/mongo");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const securitySanitizer = require("./Middleware/security");
const errorHandler = require("./Middleware/errorHandler");
const setupSwagger = require("./config/swagger");
const config = require("./config/config");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/auth");


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(securitySanitizer);

// Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
});
app.use("/api", globalLimiter);

// Database Initialization
const startServer = async () => {
  console.log("🚀 Starting API and Databases...");

  // Connect SQL (Supabase with MySQL fallback)
  await connectDB();

  // Connect NoSQL (Atlas with Local fallback)
  await connectMongoDB();

  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
  });

};

const path = require("path");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

if (config.env === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    if (!req.url.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    }
  });
} else {
  app.get("/", (req, res) => res.send("API Revista Online - Running"));
}

// Swagger & Errors
setupSwagger(app);
app.use(errorHandler);

startServer();