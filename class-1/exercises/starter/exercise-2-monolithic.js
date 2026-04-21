// Starter: Monolithic Express App
// This is intentionally one big file with mixed concerns.
// Your task: Refactor into layers (Repository, Service, Controller)

import express from 'express';

const app = express();
app.use(express.json());

// ❌ BAD: Everything in one file!

const users = [
  { id: '1', email: 'alice@example.com', name: 'Alice', passwordHash: 'hash1' },
  { id: '2', email: 'bob@example.com', name: 'Bob', passwordHash: 'hash2' }
];

let nextId = 3;

// Mixed concerns: Logging, validation, business logic, data access—all here!
app.get('/users', (req, res) => {
  console.log('GET /users');
  res.json(users.map((u) => ({ id: u.id, email: u.email, name: u.name })));
});

app.get('/users/:id', (req, res) => {
  console.log(`GET /users/${req.params.id}`);
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({ id: user.id, email: user.email, name: user.name });
});

app.post('/users', (req, res) => {
  console.log('POST /users', req.body);

  const { email, name, password } = req.body;

  // Validation
  if (!email || !name || !password) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  // Business logic
  if (users.some((u) => u.email === email)) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }

  // Data access
  const newUser = {
    id: String(nextId++),
    email,
    name,
    passwordHash: 'hash_' + password // ❌ This is NOT secure!
  };

  users.push(newUser);

  res.status(201).json({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default app;
