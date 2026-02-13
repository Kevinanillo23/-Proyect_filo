const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");
const connectMongoDB = require("./config/mongo");
const securitySanitizer = require("./Middleware/security");
const errorHandler = require("./Middleware/errorHandler");
const setupSwagger = require("./config/swagger");
const config = require("./config/config");

const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(securitySanitizer);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
});
app.use("/api", globalLimiter);

// API Endpoints
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Production config for SPA serving
if (config.env === "production") {
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));
  app.get(/.*/, (req, res) => {
    if (!req.url.startsWith("/api")) {
      res.sendFile(path.join(publicPath, "index.html"));
    }
  });
} else {
  app.get("/", (req, res) => res.status(200).json({ status: "healthy", env: config.env }));
}

setupSwagger(app);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await connectMongoDB();

    app.listen(config.port, () => {
      console.info(`Server initialized on port ${config.port} [${config.env}]`);
    });
  } catch (err) {
    console.error("Critical failure during startup:", err);
    process.exit(1);
  }
};

startServer();