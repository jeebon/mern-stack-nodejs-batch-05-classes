# Class 2: Express.js Project From Scratch + Docker

**Live Class**: 60  
**Duration**: 90 minutes  
**Difficulty**: Intermediate (hands-on)

---

## Learning Objectives

By the end of this class, you will:

1. **Initialize an Express + TypeScript project** from zero with npm/pnpm.
2. **Set up TypeScript strict mode** with path aliases for clean imports.
3. **Configure npm scripts** (dev, build, start, lint, format).
4. **Use environment variables** safely with `.env` and validation (Zod).
5. **Implement structured logging** with Pino.
6. **Build a production-ready folder structure** following industry patterns.
7. **Write a multi-stage Dockerfile** for containerization.
8. **Use docker-compose** to run app + MongoDB together.
9. **Implement graceful shutdown** (handle SIGTERM, close connections).
10. **Deploy a starter project** that you'll reuse for all future classes.

---

## Prerequisites

- Comfortable with npm/pnpm commands
- Understand Node.js basics
- Completed Class 1 (layered architecture)
- Docker and docker-compose installed
- Terminal/CLI confidence

---

## Agenda (90 minutes)

| Time | Topic | Activity |
|------|-------|----------|
| 0:00 - 0:10 | Intro & Project Setup | Slides |
| 0:10 - 0:30 | npm init & TypeScript Config | Live coding |
| 0:30 - 0:50 | Folder Structure & npm Scripts | Live demo |
| 0:50 - 1:05 | Environment Variables & Logging | Code walkthrough |
| 1:05 - 1:20 | Docker & docker-compose | Live Docker build |
| 1:20 - 1:30 | Q&A & Homework Preview | Discussion |

---

## Materials

- [Speaker Outline](./slides/outline.md)
- [01: Project Scaffolding](./notes/01-project-scaffolding.md)
- [02: Configuration & Environment](./notes/02-configuration-environment.md)
- [03: Docker & Deployment](./notes/03-docker-deployment.md)
- [Demo: Production Express Starter](./code/demo-express-starter/)

---

## Quick Start

```bash
cd code/demo-express-starter
pnpm install
pnpm dev
```

Visit `http://localhost:3000/health` and `http://localhost:3000/api/docs` (when ready).

---

## Key Concepts

##Package Scripts

```json
{
  "scripts": {
    "dev": "tsx watch src/main.js",        // Development (auto-reload)
    "build": "tsc",                        // Compile TypeScript
    "start": "node dist/main.js",          // Run compiled app
    "lint": "tsc --noEmit",               // Check types
    "format": "prettier --write src/**/*"  // Format code
  }
}
```

##Environment Variables

```typescript
// .env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
LOG_LEVEL=debug
```

Validate with Zod:

```typescript
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error'])
});

const env = envSchema.parse(process.env);
```

## Docker Basics

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
# For production
# CMD ["npm", "start"]
```

---

## Starter Project Structure

```
src/
  ├── main.js              ← Entry point
  ├── config.js            ← Environment config
  ├── logger.js            ← Structured logging
```

---

## Docker Commands

```bash
# Build image
docker build -t taskapp:latest .

# Run container
docker run -p 3000:3000 -e NODE_ENV=development taskapp:latest

# Using docker-compose
docker-compose up

# Build fresh
docker-compose up --build
```

---

## Common Mistakes

1. **Forgetting `.env`** → App crashes on startup (env vars undefined).
2. **Not using `tsx` for dev** → Slow development cycle.
3. **Shipping `node_modules` in Docker** → Bloated image.
4. **Not validating environment** → Silent bugs from typos.
5. **Forgetting graceful shutdown** → Requests lost on deploy.

---

## Quality Checklist

- ✅ `pnpm dev` works
- ✅ `pnpm build` produces dist/
- ✅ `pnpm start` runs production build
- ✅ `docker build` succeeds
- ✅ `docker-compose up` brings app + DB online
- ✅ `curl localhost:3000/health` returns `{ "status": "ok" }`

---

## Interview Questions

1. **Why use a multi-stage Dockerfile?** — Reduces image size by excluding build tools.
2. **How do you validate environment variables?** — Schema validation (Zod, Joi) before app starts.
3. **What's graceful shutdown?** — Stop accepting requests, finish in-flight ones, then exit.
4. **Why use `tsx` in dev?** — Fast dev cycle; auto-compiles and reloads.

---

## Banglish Glossary

| Term | Banglish | Explanation |
|------|----------|-------------|
| **Environment Variables** | পরিবেশ ভেরিয়েবল | অ্যাপ চালানোর জন্য সেটিংস (উদাঃ পোর্ট, ডাটাবেস URL) |
| **Docker Image** | ডকার ইমেজ | আপনার অ্যাপের ব্লুপ্রিন্ট (রান করার জন্য প্রস্তুত) |
| **Container** | কন্টেইনার | চলমান ডকার ইমেজ (জিনিসের বাস্তব উদাহরণ) |
| **docker-compose** | ডকার-কম্পোজ | একাধিক সেবা একসাথে চালানোর টুল |
| **Graceful Shutdown** | সুন্দর বন্ধ | অ্যাপ চলমান কাজ শেষ করে নিরাপদে বন্ধ করা |

---

## Support

- **Demo won't run?** Check Node 20 (`node -v`), run `pnpm install`.
- **Docker errors?** Ensure Docker daemon is running (`docker ps`).
- **Environment validation fails?** Check `.env` file exists and is in repo root.

---

**Now let's build something production-grade. Let's go! **
