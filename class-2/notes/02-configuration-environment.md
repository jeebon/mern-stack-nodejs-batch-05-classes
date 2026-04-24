# Class 2: Configuration & Environment

## Environment Variables

Environment variable হলো key-value pairs যা app-এর behavior change করে। Same code, different configurations (development বা production)।

```bash
NODE_ENV=production
PORT=8080
DATABASE_URL=mongodb://prod-db:27017/taskdb
LOG_LEVEL=warn
JWT_SECRET=super-secret-production-key
```

### খারাপ উদাহরণ (Hardcoding)

কখনো secrets code-এ write করো না:

```javascript
// ❌ খারাপ
const dbUrl = 'mongodb://localhost:27017/taskdb';
const jwtSecret = 'my-secret-123';
```

যদি এটা GitHub-এ push করো, সবাই তোমার secret দেখতে পাবে!

### ভালো উদাহরণ (Environment Variables)

```javascript
// ✅ ভালো
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
```

এখন different environments-এ ভিন্ন values পাঠাতে পারো।

---

## Environment Variables কোথায় সেট করবে?

### Local Development (.env file)

```
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
LOG_LEVEL=debug
JWT_SECRET=dev-secret-not-used-in-prod
```

### Production (Docker, CI/CD)

```bash
# Docker run
docker run -e NODE_ENV=production -e PORT=8080 myapp

# Heroku
heroku config:set NODE_ENV=production

# AWS / deployment service
# GUI থেকে environment variables set করো
```

---

## Zod দিয়ে Validation

`.env` file-এ typo থাকলে silently fail হয়। Better approach: startup-এ validate করো যাতে bad config নিয়ে run না হয়।

### বিনা validation (খারাপ)

```javascript
const port = parseInt(process.env.PORT); // যদি PORT undefined থাকে?
const dbUrl = process.env.DATABASE_URL;  // কোন error না, just undefined
```

### Zod দিয়ে validation (ভালো)

```javascript
// src/config.js
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url('must be valid URL'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  JWT_SECRET: z.string().min(10)
});

export const config = envSchema.parse(process.env);
```

Startup-এ:
- যদি `DATABASE_URL` missing → Error: "DATABASE_URL is required"
- যদি `PORT` = "abc" → Error: "Expected number"
- যদি `JWT_SECRET` too short → Error: "min 10 characters"

**App won't start with invalid config.** Exactly যা চাই!

### Config ব্যবহার

```javascript
// src/main.js
import express from 'express';
import { config } from './config.js';

const app = express();

app.listen(config.PORT, () => {
  console.log(`Server on port ${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});
```

---

## Pino দিয়ে Structured Logging

### খারাপ উদাহরণ (console.log)

```javascript
console.log('User created at 2024-03-10');
console.log('Payment failed: timeout');
```

Machine parse করতে পারে না। Grep করা কঠিন।

### ভালো উদাহরণ (Pino - JSON format)

```json
{
  "level": 30,
  "time": "2024-03-10T10:30:00.000Z",
  "pid": 12345,
  "msg": "User created",
  "event": "user_created",
  "userId": "507f1f77bcf86cd799439011",
  "email": "alice@example.com"
}
```

Machine-readable JSON। Production-এ logs easily searchable, filterable।

### Pino Setup

```bash
npm install pino
```

```javascript
// src/logger.js
import pino from 'pino';
import { config } from './config.js';

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true  // Development-এ colors দেখাও
    }
  }
});
```

### Pino Usage

```javascript
import { logger } from './logger.js';

// Info level
logger.info({
  event: 'user_created',
  userId: user._id,
  email: user.email
});

// Error level
logger.error({
  event: 'database_error',
  error: err.message,
  query: 'INSERT INTO users'
});

// Debug level (development শুধু)
logger.debug({
  event: 'request_received',
  method: req.method,
  path: req.path
});
```

### Middleware-এ Logging

```javascript
app.use((req, res, next) => {
  logger.info({
    event: 'request_started',
    method: req.method,
    path: req.path,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  next();
});
```

---

## Development vs. Production Configuration

### Development (.env)

Verbose logging, relaxed constraints, quick feedback।

```
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
LOG_LEVEL=debug
JWT_SECRET=dev-secret-key-ok-here
```

### Production (Docker/CI)

Minimal logging, strict security, performance-focused।

```yaml
# docker-compose.prod.yml
services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=8080
      - DATABASE_URL=mongodb://prod-mongo:27017/taskdb
      - LOG_LEVEL=warn
      - JWT_SECRET=${JWT_SECRET}  # Pass from secure vault
```

### Code-এ Environment Check করা

```javascript
if (config.NODE_ENV === 'production') {
  // Strict mode: caching, strict validation, minimal logging
  logger.info('Running in production');
} else {
  // Dev mode: verbose logging, skip some checks
  logger.debug('Running in development');
}
```

---

## মনে রাখো

- **Never hardcode secrets** — Database URLs, API keys, JWT secrets সবসময় environment variables-এ
- **Validate early** — Startup-এ config validate করলে bad state run হওয়ার chance থাকে না
- **.env গিটে যায় না** — `.gitignore` add করো, `.env.example` share করো
- **Logs are gold** — Structured logging production-এ debugging সহজ করে

---

## পরবর্তী: Docker

এই configuration setup এখন ready। পরের section-এ Docker দিয়ে local environment containerize করব।
