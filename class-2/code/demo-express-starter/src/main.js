import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/docs", (req, res) => {
  res.json({
    message: "Welcome to Task Manager API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      docs: "GET /api/docs",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route not found: ${req.method} ${req.path}` });
});

// Error Handler
app.use((err, req, res) => {
  logger.error({
    event: "error",
    message: err.message,
    stack: err.stack,
  });
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
