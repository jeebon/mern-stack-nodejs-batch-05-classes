/**
 * Repository Layer: In-Memory "Database"
 * Handles all data access. In a real app, this would query a database.
 * Key principle: Repository doesn't have business logic, just CRUD.
 */

// In-memory store (simulates database)
const users = [
  { id: "1", name: "Alice", createdAt: new Date("2026-04-18T10:00:00Z") },
  { id: "2", name: "Bob", createdAt: new Date("2026-04-18T10:05:00Z") },
];

const findAll = () => {
  return [...users];
};

export const userRepository = {
  findAll,
};
