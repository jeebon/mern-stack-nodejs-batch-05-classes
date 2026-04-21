# Class 1 Homework: Task Manager Backend Architecture

**সময়**: ২-৩ ঘন্টা  
**Difficulty**: Beginner-Intermediate  
**Submission**: পরের class-এর আগে

---

## Task: Task Manager Backend-এর Architecture Design করো

তুমি একটা Task Manager application বানাচ্ছ, যেখানে users তাদের tasks তৈরি, দেখতে, edit করতে পারবে। এই homework-এ তুমি সম্পূর্ণ backend architecture design করবে — কোন file থাকবে, layer-গুলো কীভাবে কথা বলবে, কোন data client-এ যাবে।

---

## Part 1: Architecture Diagram (25 points)

Task Manager-এর জন্য একটা simple architecture diagram আঁকো। সাধারণ text format-এ ঠিক আছে।

**Include করতে হবে:**
- Routes layer — কোন endpoints থাকবে (GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id)
- Middleware layer — কোন middleware থাকবে (logger, JSON parser, error handler)
- Controllers layer — কোন controller থাকবে, কী দায়িত্ব
- Services layer — কোন service থাকবে, কী business logic
- Repository layer — কোন repository থাকবে, database কী করবে

**Format:**
```
Request
  ↓
Routes: GET /tasks → getAllTasks handler
  ↓
Middleware: logger, JSON parser
  ↓
Controller: getAllTasks (validation, orchestration)
  ↓
Service: getAllTasks (business logic)
  ↓
Repository: getAll (database query)
  ↓
Database: tasks collection
```

---

## Part 2: Middleware Pipeline (25 points)

Task Manager app-এর জন্য middleware order define করো।

**Task**: নিচের middleware-গুলোর order সাজাও, তারপর explain করো কেন এই order-এ রাখলাম।

Middleware list:
- `express.json()` — JSON body parse করা
- `logger` — request log করা
- `authenticate` — JWT token check করা (optional)
- `errorHandler` — error catch করা
- Routes যা protected tasks-এর জন্য
- Routes যা public endpoints-এর জন্য

**Deliverable:**
```javascript
// তোমার middleware order এখানে
app.use(...);
app.use(...);
app.use(...);

// routes
app.get(...);
app.post(...);

// error handler
app.use(...);
```

**Explain করতে হবে** (জন্য ১০ points):
- কেন এই order-এ রাখলাম?
- যদি order ভুল হতো কী সমস্যা হত?
- কোন middleware-র ৪টা parameter থাকবে (err, req, res, next)? কেন?

---

## Part 3: Error Scenarios (15 points)

নিচের ৫টা scenario-র জন্য correct error response shape তৈরি করো:

### Scenario 1: নতুন task তৈরি করতে গেছ, কিন্তু title দেওনি

Expected HTTP Status: ?
Response:
```javascript
{
  // তোমার response
}
```

### Scenario 2: Task update করতে গেছ, কিন্তু task id ভুল (database-এ এই ID নেই)

Expected HTTP Status: ?
Response:
```javascript
{
  // তোমার response
}
```

### Scenario 3: Task delete করতে গেছ, কিন্তু JWT token invalid

Expected HTTP Status: ?
Response:
```javascript
{
  // তোমার response
}
```

### Scenario 4: Task delete করতে গেছ, কিন্তু সেটা অন্য user-এর (আপনার ownership নেই)

Expected HTTP Status: ?
Response:
```javascript
{
  // তোমার response
}
```

### Scenario 5: Server-এ database crash হয়েছে, query fail হয়েছে

Expected HTTP Status: ?
Response:
```javascript
{
  // তোমার response
}
```

---

## Part 4: Code Skeleton (Optional, +10 bonus points)

যদি code লিখতে চাও, নিচের skeleton fill করো:

```javascript
// src/routes/tasks.js
import express from 'express';
import { 
  getAllTasks, 
  createTask 
} from '../controllers/taskController.js';

const router = express.Router();

// GET /api/tasks — সব tasks আপনার জন্য
router.get('/tasks', getAllTasks);

// POST /api/tasks — নতুন task তৈরি করো
router.post('/tasks', createTask);

export default router;
```

```javascript
// src/controllers/taskController.js
/**
 * GET /tasks
 * সব tasks ফেরত দে current user-এর জন্য
 */
export async function getAllTasks(req, res, next) {
  try {
    // ১. validation (কোন validation লাগবে?)
    // २. Service call করো
    // const tasks = await taskService.getAllTasks(userId);
    // ३. DTO তে convert করো
    // ४. Response পাঠাও
  } catch (error) {
    next(error);
  }
}

/**
 * POST /tasks
 * নতুন task তৈরি করো
 */
export async function createTask(req, res, next) {
  try {
    // १. Validate request.body (title required?)
    // २. Service call করো
    // const newTask = await taskService.createTask({ ... });
    // ३. Response পাঠাও (201 Created)
  } catch (error) {
    next(error);
  }
}
```

```javascript
// src/services/taskService.js
/**
 * সব tasks fetch করো current user-এর জন্য
 */
export async function getAllTasks(userId) {
  // Service logic — HTTP-র কথা ভাবছি না
  // const tasks = await taskRepository.getAllByUserId(userId);
  // return tasks;
}

/**
 * নতুন task create করো
 */
export async function createTask(taskData) {
  // Business logic — validation, check duplicate, etc.
  // const savedTask = await taskRepository.create(taskData);
  // return savedTask;
}
```

```javascript
// src/repositories/taskRepository.js
/**
 * সব tasks database থেকে fetch করো
 */
export async function getAllByUserId(userId) {
  // const tasks = await db.collection('tasks').find({ userId }).toArray();
  // return tasks;
}

/**
 * নতুন task save করো
 */
export async function create(taskData) {
  // const result = await db.collection('tasks').insertOne(taskData);
  // return result;
}
```

---

## Grading Rubric (মোট ১০০ points)

| Part | Points | Evaluation Criteria |
|------|--------|-------------------|
| Part 1: Architecture Diagram | 25 | সব layer আছে? Request flow clear? সব responsibility assign হয়েছে? |
| Part 2: Middleware Order | 25 | Order সঠিক? Explanation convincing? Error handler সঠিক জায়গায়? |
| Part 3: Error Responses | 15 | Status code সঠিক? Response shape useful? কোন details আছে? |
| Part 4: Code (Optional) | +10 | Code structure সঠিক? Comments helpful? |

---

## Submission Format

Choose one:

### Option 1: Document (সহজ)
একটা `.md` বা `.txt` file এ সব answer লেখো এবং submit করো।

### Option 2: Code Repository
GitHub-এ একটা folder create করো এবং code লিখো।

### Option 3: Google Doc
Google Docs-এ লিখো এবং link শেয়ার করো।

---

## Testing Your Understanding

Submit করার আগে নিজেকে ask করো:

- [ ] কেন Repository layer আলাদা থাকা দরকার?
- [ ] যদি Database থেকে API response directly পাঠাই (DTO skip করি), কী সমস্যা হবে?
- [ ] Middleware order ভুল হলে authenticate কখন fail হবে?
- [ ] `400 Bad Request` আর `404 Not Found`-এর মধ্যে কী difference?
- [ ] Service layer-এ কেন HTTP request object (req) থাকবে না?

যদি সব question-এর উত্তর দিতে পারো, তুমি ready!

---

## পরবর্তী Step

- Homework submit করার পর, Class 2 শুরু করো
- Class 2-এ Configuration, Environment, Project setup নিয়ে আলোচনা হবে
- সেখানে এই architecture-এর জন্য actual project structure বানাবে

---

**সহায়তা লাগলে:**
- Class 1 slides আবার দেখো (middleware order, DTO, status codes)
- `code/demo-hello-architecture/` demo code পড়ো — structure দেখবে
- Class 1 notes পড়ো — deep dive আছে প্রতিটা layer-এ
