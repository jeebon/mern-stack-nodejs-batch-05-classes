/**
 * Service Layer: Business Logic
 * Contains the "what should happen" logic.
 * Services don't know about HTTP; they're pure logic.
 * Can be called from controllers, CLI, jobs, etc.
 */

import { userRepository } from "../repositories/userRepository.js";

export const getAllUsers = () => {
  const users = userRepository.findAll();
  return users;
};

export const userService = {
  getAllUsers,
};
