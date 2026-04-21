/**
 * Route Layer: URL Pattern Matching
 * Maps HTTP paths and methods to controller handlers.
 */

import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = Router();

/**
 * GET /users
 * Get all users
 */
router.get("/", (req, res, next) => {
  getAllUsers(req, res, next);
});

export default router;
