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
const getAllUsers = (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /users/:id
 * Retrieve a user by id
 * @returns {Promise<void>}
 */
const getUserById = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = userService.getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "404", message: "User not found, invalid ID" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /users
 * Create a new user
 * @returns {Promise<void>}
 */
const createUser = (req, res, next) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /users/:id
 * Update a user
 * @returns {Promise<void>}
 */
const updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = userService.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /users/:id
 * Delete a user
 * @returns {Promise<void>}
 */
const deleteUser = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = userService.deleteUser(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
