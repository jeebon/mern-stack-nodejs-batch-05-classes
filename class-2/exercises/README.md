# Class 2: Exercises & Homework

## Exercise 1: Set Up Your Own Project

Create a new Express project from scratch.

**Steps**:
1. `mkdir myapp && cd myapp`
2. `npm init -y`
3. Install dependencies (express, zod, pino, dotenv)
4. Create folder structure (`src/`)
5. Create `.env` and `.env.example`
6. Write `src/main.js` with a `/health` endpoint
7. Test: `npm run dev`

---

## Exercise 2: Add Environment Validation

Take the project from Exercise 1. Create `src/config.js`:

**Requirements**:
- Validate `NODE_ENV` (dev or prod)
- Validate `PORT` (number, default 3000)
- Validate `DATABASE_URL` (valid URL)
- Validate `JWT_SECRET` (min 32 chars)
- If validation fails, log errors and exit

**Test**:
- Delete a required env var from `.env` and start the app → should fail
- Add back and restart → should succeed

---

## Exercise 3: Add Structured Logging

Create `src/logger.js` using Pino:

**Requirements**:
- Use Pino logger
- Log level from config
- Pretty-print in development
- JSON in production

Then update `src/main.js` to log:
- App started (with port and env)
- Each request (method, path)
- Errors (with stack trace)

---

## Exercise 4: Dockerize Your App

For the project from Exercise 1-3:

**Create**:
- `Dockerfile` (multi-stage build)
- `docker-compose.yml` (app + MongoDB)
- `.dockerignore`

**Test**:
- `docker build -t myapp:latest .`
- `docker run -p 3000:3000 myapp:latest` → should start
- `docker-compose up --build` → app + mongo should run

---

## Homework: Extend the Starter

**Task**: Fork `demo-express-starter` and add:

1. **New endpoint** `POST /tasks`:
   - Accept `{ title: string, description: string }`
   - Return `{ id, title, description, createdAt }`
   - Validate input (title required, 3+ chars)

2. **New endpoint** `GET /tasks/:id`:
   - Return a task by ID
   - Return 404 if not found

3. **Logging**: Log each request with event name, method, path

4. **Error handling**: Return structured error responses

**Submission**:
- Push to GitHub
- Should run with `npm install && npm dev`
- Test with curl or Postman

