# Class 2 Homework: Express Starter Setup এবং Basic Endpoints

**সময়**: ১-২ ঘন্টা  
**জমা দেওয়ার সময়**: Class 3-এর আগে  
**Difficulty**: Beginner

---

## Task: Production-Grade Express Starter তৈরি করো

এই homework-এ class-2-এ শেখা সবকিছু apply করবে — project setup, environment configuration, Docker, এবং basic endpoints।

---

## Requirements

Class 1 homework-এর Task Manager architecture নিয়ে একটা Express app initialize করবে।

### Part 1: Project Setup (20 points)

নিচের steps follow করে project setup করো:

**Step 1:** নতুন folder create করো

```bash
mkdir task-manager-api
cd task-manager-api
```

**Step 2:** npm initialize করো

```bash
npm init -y
```

Edit করো `package.json`:
- `"type": "module"` add করো (ESM modules)
- Scripts add করো:
  - `"dev"`: `node --watch src/main.js`
  - `"start"`: `node src/main.js`
- Dependencies: `express`, `zod`, `pino`, `dotenv`

**Step 3:** Dependencies install করো

```bash
npm install
```

**Step 4:** Folder structure তৈরি করো

```
src/
├── main.js
├── config.js
├── logger.js
├── middleware/
│   └── errorHandler.js
├── routes/
│   └── tasks.js
├── controllers/
│   └── taskController.js
├── services/
│   └── taskService.js
└── repositories/
    └── taskRepository.js
```

**Deliverable**: `package.json` properly configured with scripts, `.env` file, folder structure।

---

### Part 2: Configuration এবং Logging (25 points)

**Task:** config.js এবং logger.js implement করো।

**src/config.js** (15 points)

```javascript
// Environment variables validate করো Zod দিয়ে
// Required variables:
// - NODE_ENV (default: 'development')
// - PORT (default: 3000)
// - LOG_LEVEL (default: 'info')
// - DATABASE_URL (should be valid)

// Example:
// const config = configSchema.parse(process.env);
// export default config;
```

Requirements:
- Zod schema define করো সব variables-এর জন্য
- startup-এ validate করো
- `process.env` থেকে read করো
- Invalid config থাকলে app crash করো

**src/logger.js** (10 points)

```javascript
// Pino logger setup করো
// Should have:
// - Proper log level configuration
// - Structured logging format
// - Pretty-print development-এ

// export default logger;
```

**Deliverable**: Working config.js এবং logger.js যা startup-এ validate করে এবং logs properly format করে।

---

### Part 3: Basic Endpoints (30 points)

তিনটা endpoints implement করো:

#### Endpoint 1: Health Check (10 points)

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-10T10:30:00.000Z",
  "uptime": 123.45
}
```

Requirements:
- Server uptime calculate করো
- JSON response return করো
- 200 status code

#### Endpoint 2: Get All Tasks (10 points)

```
GET /api/tasks
```

Requirements:
- In-memory array থেকে সব tasks return করো (database implementation না করে)
- DTO apply করো (class 1 থেকে শেখা)
- Empty array return করলেও ok

Response format:
```json
{
  "data": [
    { "id": "1", "title": "Learn Express", "status": "in_progress" },
    { "id": "2", "title": "Learn MongoDB", "status": "pending" }
  ],
  "count": 2
}
```

#### Endpoint 3: Create Task (10 points)

```
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description"
}
```

Requirements:
- Request body validate করো (title required, description optional)
- Validation fail করলে 400 error return করো
- Successful create হলে 201 return করো
- In-memory array-এ task add করো (unique ID generate করো)

Response (201 Created):
```json
{
  "id": "1",
  "title": "Task title",
  "description": "Task description",
  "status": "pending",
  "createdAt": "2024-03-10T10:30:00.000Z"
}
```

Response (400 Bad Request):
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required"
  }
}
```

---

### Part 4: Error Handling (15 points)

**Task:** Global error handler implement করো।

Requirements:
- সব requests-এ logging middleware add করো
- Express-এ 4-parameter error handler add করো
- Unhandled routes-এ 404 return করো
- Server errors-এ 500 return করো

Example:

```javascript
// error handler middleware
app.use((err, req, res, next) => {
  logger.error({
    event: 'request_error',
    error: err.message,
    path: req.path,
    method: req.method
  });

  res.status(500).json({
    status: 500,
    message: 'Internal server error'
  });
});
```

**Deliverable**: Working error handler middleware যা errors log করে এবং proper responses return করে।

---

### Part 5: Docker Setup (Optional, +10 bonus points)

Dockerfile এবং docker-compose.yml write করো।

**Dockerfile**

Simple multi-stage Dockerfile:
- Node 20 image base
- src copy করো
- express app run করো

**docker-compose.yml**

```bash
docker-compose up
curl http://localhost:3000/health
```

---

## Testing Your API

### Test commands (curl)

```bash
# Health endpoint test করো
curl http://localhost:3000/health

# All tasks fetch করো
curl http://localhost:3000/api/tasks

# নতুন task create করো
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Complete class 2 homework"}'

# Invalid request test করো (title missing)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{}'

# Server logs দেখো
# npm run dev চালানো terminal-এ logs appear হবে
```

---

## Grading Rubric (মোট ১০০ points)

| Part | Points | Criteria |
|------|--------|----------|
| Part 1: Setup | 20 | package.json proper, folder structure clear, scripts working |
| Part 2: Config & Logger | 25 | Zod validation, logger properly configured, errors on invalid config |
| Part 3: Endpoints | 30 | Health ok, GET /api/tasks working, POST /api/tasks with validation |
| Part 4: Error Handling | 15 | Error handler present, logs working, 404 for unknown routes |
| Part 5: Docker (Optional) | +10 | Dockerfile + docker-compose working, `docker-compose up` succeeds |

---

## Submission Format

Choose one:

### Option 1: GitHub Repository
```bash
git init
git add .
git commit -m "Initial setup with express and endpoints"
git push
```

Share repository link।

### Option 2: ZIP File

```bash
zip -r task-manager-api.zip task-manager-api/
```

Upload করো।

### Option 3: Live Demo

যদি deployed করেছ (Heroku, Vercel, ইত্যাদি), live URL শেয়ার করো এবং logs দেখাও।

---

## Code Quality Checklist

Submit করার আগে verify করো:

- [ ] `npm run dev` দিয়ে app start হয়?
- [ ] `GET /health` কাজ করে?
- [ ] `GET /api/tasks` কাজ করে?
- [ ] `POST /api/tasks` valid request-এ কাজ করে?
- [ ] `POST /api/tasks` invalid request-এ 400 return করে?
- [ ] সব errors logged হয়?
- [ ] `.env` file সঠিক আছে?
- [ ] `node_modules` `.gitignore`-এ add আছে?

---

## Common Issues এবং Solutions

### "PORT 3000 already in use"
```bash
PORT=3001 npm run dev
```

### "Cannot find module 'express'"
```bash
npm install
```

### "config.DATABASE_URL is undefined"
- `.env` file আছে কিনা check করো
- APP root directory-এ আছে কিনা check করো (না src/-এ)

### "req.body undefined"
- `express.json()` middleware add করেছ কিনা check করো

---

## Help চাইলে

- Class 2 slides পড়ো (environment, config, logging)
- `code/demo-express-starter/` reference code দেখো
- Notes এর examples reference করো

---

## Bonus Ideas (করতে পারো পরে)

এই বেসিক features-এর পর:
- Update task: `PUT /api/tasks/:id`
- Delete task: `DELETE /api/tasks/:id`
- Filter tasks: `GET /api/tasks?status=pending`
- Pagination: `GET /api/tasks?page=1&limit=10`

---

**জমা দেওয়ার সময়**: Class 3-এর আগে। যেকোনো format-এ ok।
