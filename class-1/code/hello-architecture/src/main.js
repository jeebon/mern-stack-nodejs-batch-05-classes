/**
 * Main Application Entry Point
 * Initializes Express app, registers middleware, routes, and starts server.
 */

import express from "express";
import usersRouter from "./routes/users.js";
import { loggingMiddleware } from "./middleware/logger.js";

const app = express();
const PORT = 3000;

// ============ Middleware Setup ============

app.use(loggingMiddleware);
app.use(express.json());

// ============ Routes ============

app.use("/users", usersRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "200", message: "OK" });
});

// ============ Error Handling ============

/**
 * 404 Not Found Handler
 */
app.use((_req, res) => {
  res.status(404).json({
    status: "404",
    message: `Route not found: ${_req.method} ${_req.path}`,
  });
});

/**
 * Global Error Handler
 * This must be last!
 */
app.use((err, _req, res, _next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    status: "500",
    message: "Internal server error",
  });
});

// ============ Start Server ============

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("");
  console.log("Try these commands:");
  console.log(`  curl http://localhost:${PORT}/users`);
  console.log(`  curl http://localhost:${PORT}/users/1`);
  console.log(
    `  curl -X POST http://localhost:${PORT}/users -H "Content-Type: application/json" -d '{"name":"Charlie"}'`,
  );
});
