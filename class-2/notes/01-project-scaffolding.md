# Class 2: Project Scaffolding & Setup

Production-grade Express project একদম শুরু থেকে কীভাবে করতে হয় এটা শিখছি।

---

## Step 1: Project Initialize করো

```bash
mkdir taskapp
cd taskapp
npm init -y
```

`npm init -y` দ্রুত `package.json` তৈরি করে। এখন `package.json` edit করো:

```json
{
  "name": "taskapp",
  "version": "1.0.0",
  "description": "Task Manager Backend",
  "type": "module",
  "main": "src/main.js",
  "scripts": {
    "dev": "node --watch src/main.js",
    "start": "node src/main.js",
    "lint": "eslint ."
  },
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^4.18.0",
    "mongodb": "^6.0.0",
    "zod": "^3.22.0",
    "pino": "^8.17.0"
  },
}
```

**Key points:**
- `"type": "module"` মানে ESM modules use করছি (import/export syntax)
- `"scripts"` দিয়ে npm shortcuts define করছি

---

## Step 2: Dependencies Install করো

```bash
npm install
```

এটা `package.json` থেকে সব dependencies install করে।

**কোন library কেন লাগছে:**
- **express** — Web framework
- **mongodb** — Database driver
- **zod** — Environment variable validation
- **pino** — Structured logging
- **nodemon** (dev) — Development-এ auto-restart

---

## Step 3: Folder Structure তৈরি করো

Class 1-এ শেখা architecture-কে এই structure-এ বাস্তবায়ন করছি।

```bash
mkdir -p src/{middleware,routes,controllers,services,repositories,config,types}
touch src/main.js src/config.js src/logger.js
```

Final structure:

```
taskapp/
├── src/
│   ├── main.js               ← Entry point
│   ├── config.js             ← Environment config
│   ├── logger.js             ← Logging setup
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── routes/
│   │   └── tasks.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   ├── repositories/
│   │   └── taskRepository.js
│   └── types/
│       └── dto.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

প্রতিটা layer একটা folder, প্রতিটা feature একটা file। এটা scale করে।

---

## Step 4: .env File দিয়ে Secrets রাখো

`.env` file-এ sensitive data রাখো (database URL, JWT secret, API keys)।

```bash
# .env (never commit this!)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
LOG_LEVEL=debug
JWT_SECRET=super-secret-key-for-development-only
```

**Critical:** `.gitignore`-এ `.env` add করো:

```bash
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
```

---

## Step 5: .env.example দিয়ে Template শেয়ার করো

যারা code pull করবে, তারা জানবে কোন environment variables দরকার। `.env.example` commit করো:

```bash
# .env.example (safe to commit)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
LOG_LEVEL=debug
JWT_SECRET=change-this-in-production
```

নতুন developer এই file copy করে নিজের `.env` তৈরি করবে।

---

## Step 6: config.js — Environment Validation

Startup-এ environment variables validate করো। যদি কোন required variable missing থাকে, app crash করো (ভালো, bad state run করার চেয়ে)।

```javascript
// src/config.js
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  JWT_SECRET: z.string().min(10)
});

export const config = configSchema.parse(process.env);

console.log(`✓ Config validated: NODE_ENV=${config.NODE_ENV}, PORT=${config.PORT}`);
```

এখন code-এ `config.PORT`, `config.DATABASE_URL` ব্যবহার করো।

---

## Step 7: logger.js — Structured Logging

`console.log()` ছাড়িয়ে structured logging করো। Pino library ব্যবহার করছি।

```javascript
// src/logger.js
import pino from 'pino';
import { config } from './config.js';

const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

export default logger;
```

Usage:

```javascript
logger.info({ event: 'app_started', port: config.PORT });
logger.error({ event: 'task_creation_failed', error: err.message });
logger.debug({ event: 'database_query', query: 'find all tasks' });
```

Logs এখন JSON format-এ, timestamp-সহ, machine-readable। Production-এ logs easily parse করা যায়।

---

## Step 8: main.js — Express App Setup

এখন entry point লিখি। এখানে সবকিছু একসাথে আসে।

```javascript
// src/main.js
import express from 'express';
import { config } from './config.js';
import logger from './logger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    path: req.path,
    ip: req.ip
  });
  next();
});

// Routes (TODO)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler (সবসময় সবচেয়ে শেষে)
app.use(errorHandler);

// Server start করো
app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`);
});
```

---

## Step 9: npm Scripts Test করো

```bash
npm run dev          # Development mode start করো
curl http://localhost:3000/health   # Test করো
```

Output দেখতে পাবে:
```json
{"status": "ok"}
```

---

## Common npm Commands

```bash
# New dependency add করো
npm install axios

# Dev dependency add করো
npm install -D eslint

# Dependency remove করো
npm uninstall axios

# সব packages update করো
npm update

# Outdated packages দেখো
npm outdated

# Clean install (lock file use করে exact versions)
rm -rf node_modules package-lock.json
npm ci
```

---

## Debugging Tips

### "Cannot find module 'express'"
```
Error: Cannot find module 'express'
```
**Solution**: `npm install express`

### "PORT 3000 already in use"
```
Error: listen EADDRINUSE :::3000
```
**Solution**: ভিন্ন port use করো বা পুরনো process kill করো:
```bash
PORT=3001 npm run dev
# বা
lsof -i :3000  # যে process use করছে তা দেখো
kill -9 <PID>
```

### ".env not loading"
```
Error: DATABASE_URL is undefined
```
**Solution**: 
- `.env` file আছে কি check করো
- App root directory-এ আছে কি check করো (not in src/)
- `npm install dotenv` করলে কাজ হবে (automatic load-এর জন্য)

---

## মনে রাখো

- **Structure first** — নতুন feature add করার আগে folder/file structure clear থাকা উচিত
- **Environment variables early** — Database URL, secret keys কখনো code-এ hardcode করো না
- **Validate on startup** — Application run হওয়ার আগে configuration valid কি না check করো
- **Log everything** — Debug করা সহজ হয় যদি logs ভালোভাবে organize থাকে

---

## পরবর্তী ক্লাস Preview

এই setup এখন ready। পরের class-এ:
- Database কে connect করব
- CRUD operations লিখব
- First API endpoint complete করব

এই structure reuse করবে সব future projects-এ।
