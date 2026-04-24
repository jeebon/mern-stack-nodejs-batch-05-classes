/**
 * Service Layer: Business Logic
 * Contains the "what should happen" logic.
 * Services don't know about HTTP; they're pure logic.
 * Can be called from controllers, CLI, jobs, etc.
 */

import { userRepository } from "../repositories/userRepository.js";

const toDTO = (user) => {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.createdAt,
    currentTime: new Date().toISOString(),
  };
};

/**
 * Get all users
 * @returns {Array<Object>}
 */
const getAllUsers = () => {
  const users = userRepository.findAll();
  return users.map(toDTO);
};

/**
 * Get a user by id
 * @param {string} id
 * @returns {Object}
 */
const getUserById = (id) => {
  const user = userRepository.findById(id);
  return toDTO(user);
};

/**
 * Create a new user
 * @param {Object} user
 * @returns {Object}
 */
const createUser = (user) => {
  const newUser = userRepository.create(user);
  return toDTO(newUser);
};

/**
 * Update a user
 * @param {string} id
 * @param {Object} user
 * @returns {Object}
 */
const updateUser = (id, user) => {
  const updatedUser = userRepository.update(id, user);
  return toDTO(updatedUser);
};

/**
 * Delete a user
 * @param {string} id
 * @returns {Object}
 */
const deleteUser = (id) => {
  const deletedUser = userRepository.remove(id);
  return deletedUser;
};

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
