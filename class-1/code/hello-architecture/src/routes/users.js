/**
 * Route Layer: URL Pattern Matching
 * Maps HTTP paths and methods to controller handlers.
 */

import { Router } from "express";
import { userController } from "../controllers/userController.js";

const router = Router();

/**
 * GET /users
 * Get all users
 * @returns {Promise<void>}
 */
router.get("/", (req, res, next) => {
  userController.getAllUsers(req, res, next);
});

/**
 * GET /users/:id
 * Get a user by id
 * @returns {Promise<void>}
 */
router.get("/:id", (req, res, next) => {
  userController.getUserById(req, res, next);
});

/**
 * POST /users
 * Create a new user
 * @returns {Promise<void>}
 */

router.post("/", (req, res, next) => {
  userController.createUser(req, res, next);
});

/**
 * PUT /users/:id
 * Update a user
 * @returns {Promise<void>}
 */
router.put("/:id", (req, res, next) => {
  userController.updateUser(req, res, next);
});

/**
 * DELETE /users/:id
 * Delete a user
 * @returns {Promise<void>}
 */
router.delete("/:id", (req, res, next) => {
  userController.deleteUser(req, res, next);
});

export default router;
