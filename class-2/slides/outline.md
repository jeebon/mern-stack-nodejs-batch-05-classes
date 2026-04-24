# Class 1: MERN Stack Backend (Node.js / Express.js)

## Environment, Docker, Production Level

**Anowar Hossain Jeebon** <br>
Senior Software Engineer <br>
Cefalo Bangladesh Ltd. <br>

LinkedIn: <https://www.linkedin.com/in/jeebon/>

---

## আজকের Class-এ কী শিখবো?

- NPM দিয়ে project initialize করা (একদম শুরু থেকে)
- Environment variables কনফিগার করা (সিক্রেট safely রাখা)
- Project folder structure তৈরি করা (production-grade pattern)
- Docker দিয়ে local development setup করা

---

## Slide: NPM init করো

NPM হলো Node.js-এর package manager। এটা তোমার project-এর dependencies manage করে।

- `npm init -y` দিয়ে দ্রুত `package.json` তৈরি হয়
- `package.json`-এ project metadata, scripts, dependencies থাকে
- Dependencies হলো project-এ লাগা external libraries (express, mongodb, ইত্যাদি)

**Ex.:**

```bash
mkdir my-task-app
cd my-task-app
npm init -y
npm install express
npm install -D nodemon
```

এখন `package.json`-এ `express` থাকবে।

---

## Slide: package.json Scripts

`package.json`-এ `"scripts"` section আছে। এখানে command shortcuts লেখা হয়।

- `npm run dev` — development mode-এ run করো (hot-reload দিয়ে)
- `npm start` — production-এ run করো
- `npm run lint` — code style check করো

**Ex.:**

```json
{
  "name": "task-manager",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/main.js",
    "start": "node src/main.js",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

`npm run dev` লিখলে `node --watch src/main.js` run হয়।

---

## Slide: Project Folder Structure

ভালো structure মানে প্রতিটা file-এর একটা জায়গা আছে। এটা code organize রাখে।

```
src/
├── main.js           ← App entry point
├── config.js         ← Environment variables
├── logger.js         ← Logging setup
├── middleware/       ← Middleware functions
│   ├── errorHandler.js
│   └── logger.js
├── routes/           ← API routes
│   └── tasks.js
├── controllers/      ← Controllers
│   └── taskController.js
├── services/         ← Business logic
│   └── taskService.js
└── repositories/     ← Database layer
    └── taskRepository.js
```

প্রতিটা layer আলাদা folder-এ থাকে। এটাই class-1-এ শেখা architecture।

---

## Slide: .env File দিয়ে Secrets রাখো

Never hardcode secrets (passwords, API keys, database URLs) code-এ। `.env` file-এ রাখো।

- Understand `dotenv` pacakge
- `PORT` — App কোন port-এ চলবে
- `DATABASE_URL` — Database connection string
- `JWT_SECRET` — জিনিস sign করার জন্য secret key
- `NODE_ENV` — development নাকি production

**Ex.:**

```
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/taskdb
JWT_SECRET=my-super-secret-key-never-share-this
```

`.env` file-টা `.gitignore`-এ add করো যাতে accidentally commit না হয়।

---

## Slide: Understand Schema validation using Zod & .env parse করো Code-এ

`.env` file-এ থাকা values code-এ read করতে হবে এবং validate করতে হবে।

- `process.env.PORT` দিয়ে environment variable read করো
- Zod library দিয়ে validation করো

**Ex.:**

```javascript
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10)
});

const config = configSchema.parse(process.env);

console.log(`Server running on port ${config.PORT}`);
```

যদি কোন environment variable invalid হয় বা missing থাকে, app startup-এ crash হয়ে জানায় (ভালো)।

---

## Slide: Logging Setup করো

`console.log()` ছাড়িয়ে structured logging করো।

- প্রতিটা log-এ timestamp, level (info/error/debug), message থাকে
- Logs JSON format-এ থাকে যাতে machine read করতে পারে
- Production-এ important events log করা আরো সহজ হয়

**Ex.:**

```javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

logger.info({ event: 'app_started', port: 3000 });
logger.error({ event: 'database_error', message: err.message });
```

Output:

```json
{"level":30,"time":"2024-03-10T10:20:30.000Z","pid":1234,"hostname":"localhost","msg":"app_started","port":3000}
```

---

## Slide: Docker দিয়ে Local Setup

Docker use করলে তোমার machine-এ MongoDB, Redis ইত্যাদি install না করে run করতে পারো।

- Dockerfile define করে container image তৈরি হয়
- docker-compose.yml define করে multiple services (app + database) একসাথে run হয়
- `docker-compose up` লিখলে সবকিছু start হয়

**Ex.:**

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/taskdb

  mongo:
    image: mongo:6-alpine
    ports:
      - "27017:27017"
    volumes:
      - mongodata:/data/db

volumes:
  mongodata:
```

এখন `docker-compose up` দিলে app + MongoDB দুটোই start হয়।

---

## Slide: Dockerfile

Dockerfile project-কে container image-এ pack করে।

- Multi-stage build: প্রথম stage-এ dependencies install করো এবং code build করো, দ্বিতীয় stage-এ শুধু compiled code copy করো
- Final image ছোট থাকে (dependencies install command থাকে না)

**Ex.:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY src src
RUN npm run build  # Not needed for JS, but shows the pattern

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

Stage 1-এ সবকিছু compile হয়, Stage 2-এ শুধু final artifact থাকে।

---

## Slide: Environment Variables in Docker

docker-compose.yml-এ environment variables set করো যাতে app জানে কোথায় database আছে।

- Local development-এ `DATABASE_URL=mongodb://mongo:27017` (mongo service-এর নাম)
- Production-এ `DATABASE_URL=mongodb://prod-server:27017` (different server)

**Ex.:**

```yaml
services:
  app:
    build: .
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://mongo:27017/taskdb
      - JWT_SECRET=dev-secret-never-use-in-production

  mongo:
    image: mongo:6-alpine
```

App-এর code-এ `process.env.DATABASE_URL` দিয়ে read করো।

---

## Slide: npm vs pnpm vs yarn

তিনটাই package managers, কিন্তু pnpm দ্রুত এবং disk space কম লাগায়।

- npm — default, সবচেয়ে common
- pnpm — faster, smaller
- yarn — Facebook-এর version

এই course-এ npm ব্যবহার করছি।

**Common commands:**

```bash
npm install              # dependencies install করো
npm run dev             # dev script run করো
npm install -D eslint   # dev dependency add করো
```

---

## Slide: Version Management নিয়ে এক্সট্রা কথা

`package.json`-এ dependency versions লেখা থাকে।

- `"express": "^4.18.0"` — 4.18.0 বা পরবর্তী minor/patch version
- `"express": "~4.18.0"` — 4.18.x শুধু (patch update)
- `"express": "4.18.0"` — exact version

`npm install` করলে `package-lock.json` তৈরি হয় যেখানে exact versions lock থাকে।

---

## Slide: কমন Errors এবং Solutions

### "Module not found"

```
Error: Cannot find module 'express'
```

**Solution**: `npm install express` করো

### "Port already in use"

```
Error: listen EADDRINUSE :::3000
```

**Solution**: `PORT=3001 npm run dev` দিয়ে ভিন্ন port use করো

### "DATABASE_URL not defined"

```
Error: DATABASE_URL is undefined
```

**Solution**: `.env` file আছে কিনা check করো এবং `npm install dotenv` করো

---

## Slide: মনে রাখো

- **Structure matters** — folder structure code organize রাখে
- **Environment first** — secrets কখনো code-এ hardcode করো না
- **Docker locally** — local machine-এ dependencies install না করে Docker use করো
- **Validate early** — startup-এ environment variables validate করো, যাতে invalid config নিয়ে run না হয়

---

## Slide: Homework এবং Next Step

এই class-এ একটা production-grade Express starter setup করছ। এটাই আগামী সব projects-এর base থাকবে।

পরের class-এ:

- Database connect করব (MongoDB)
- CRUD operations লিখব
- Authentication add করব

এখন এই setup confident-এ ব্যবহার করতে পারবে সব future classes-এ।
