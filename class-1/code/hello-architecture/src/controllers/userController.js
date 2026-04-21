/**
 * Controller Layer: HTTP Request Handlers
 * Handles HTTP concerns: validation, status codes, response formatting.
 * Controllers should be thin; they orchestrate but don't contain business logic.
 */

import { userService } from "../services/userService.js";

/**
 * GET /users
 * Retrieve all users
 * @returns {Promise<void>}
 */
export const getAllUsers = (_req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
