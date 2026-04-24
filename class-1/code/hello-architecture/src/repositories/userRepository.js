/**
 * Repository Layer: In-Memory "Database"
 * Handles all data access. In a real app, this would query a database.
 * Key principle: Repository doesn't have business logic, just CRUD.
 */

// In-memory store (simulates database)
const users = [
  {
    id: "1",
    name: "Alice",
    password: "123456",
    createdAt: new Date("2026-04-18T10:00:00Z"),
  },
  {
    id: "2",
    name: "Bob",
    password: "123456",
    createdAt: new Date("2026-04-18T10:05:00Z"),
  },
];

const findAll = () => {
  return users;
};

const findById = (id) => {
  console.log("findById", id);
  console.log("users", users);
  return users.find((user) => user.id === id) || null;
};

const create = (user) => {
  const newUser = {
    id: String(users.length + 1),
    name: user.name,
    password: user.password,
    createdAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

const update = (id, user) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = user;
  return user;
};

const remove = (id) => {
  users = users.filter((user) => user.id !== id);
  return user;
};

export const userRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
