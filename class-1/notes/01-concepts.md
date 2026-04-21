# Class 1: Core Concepts — Back End Architecture

---

## HTTP Request/Response Cycle কী?

### ব্রাউজার যখন একটা Request পাঠায় তখন কী হয়?

```
Browser                     Network                    Server
   │
   ├─ ইউজার একটা লিংক ক্লিক করে বা ফর্ম সাবমিট করে
   │
   ├─ ব্রাউজার HTTP request তৈরি করে
   │  (e.g., GET /api/users HTTP/1.1)
   │
   ├─────────────────────────────────────────────────────────────→ Network
   │                                                                 │
   │                                                        Express request
   │                                                        গ্রহণ করে
   │                                                                 │
   │                                                        Middleware #1
   │                                                        Middleware #2
   │                                                        ...
   │                                                        Router মিলায়
   │                                                        Controller চলে
   │                                                        Service চলে
   │                                                        Repository চলে
   │                                                        Database query চলে
   │
   │                                                        Response তৈরি হয়
   │
   │←────────────────────────────────────────────────────────────── Response
   │
   ├─ ব্রাউজার response পায়
   │  (JSON data, HTML, images, etc.)
   │
   ├─ ব্রাউজার content রেন্ডার করে
   │  (DOM আপডেট করে, JavaScript চালায়)
   │
   └─ ইউজার পেজটা দেখে
```

### একটা HTTP Request এর কাঠামো

```
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer eyJhb...

{
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Request line**: `POST /api/users HTTP/1.1`
- **METHOD**: `POST` (নতুন রিসোর্স তৈরি করা) — আরও আছে: GET, PUT, DELETE, PATCH
- **PATH**: `/api/users` (URL route)
- **VERSION**: `HTTP/1.1` (protocol version)

**Headers**: Request সম্পর্কে মেটাডেটা
- `Host`: কোন সার্ভারে যাচ্ছে?
- `Content-Type`: Body কোন ফরম্যাটে আছে?
- `Authorization`: প্রমাণপত্র (authentication credentials)

**Body**: যে ডেটা পাঠাচ্ছি (optional)
- POST/PUT এর জন্য: সাধারণত JSON

### একটা HTTP Response এর কাঠামো

```
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 123

{
  "id": "123",
  "name": "Alice",
  "email": "alice@example.com",
  "createdAt": "2026-04-18T10:00:00Z"
}
```

**Status line**: `HTTP/1.1 201 Created`
- **VERSION**: `HTTP/1.1`
- **CODE**: `201` (মানে: রিসোর্স তৈরি হয়েছে)
- **MESSAGE**: `Created` (মানুষের জন্য পড়যোগ্য)

**Headers**: Response সম্পর্কে মেটাডেটা
- `Content-Type`: Body কোন ফরম্যাটে আছে?
- `Content-Length`: Body এ কত বাইট আছে?

**Body**: আসল ডেটা
- সাধারণত JSON, কিন্তু HTML বা ইমেজও হতে পারে

---

## Layered Architecture Pattern

### আমাদের কেন Layers দরকার?

কল্পনা করো একটা ফাইলেই সবকিছু লেখা আছে:

```javascript
// ❌ খারাপ: সবকিছু এক জায়গায়
app.post('/users', async (req, res) => {
  // Validation
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  // Database query
  const client = new pg.Client(/* config */);
  await client.connect();
  const result = await client.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [req.body.name, req.body.email, passwordHash]
  );
  await client.end();

  // Response
  res.status(201).json({
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email
  });
});
```

**সমস্যা**:
- এক handler এ ৩০ লাইন। ১০০টা endpoint হলে ৩০০০ লাইন!
- "create user" logic অন্যত্র ব্যবহার করতে (CLI, job ইত্যাদিতে) copy-paste করতে হয়।
- Database PostgreSQL থেকে MongoDB তে বদলালে সবকিছু লিখতে হবে।
- Logic test করতে HTTP, database সব mock করতে হবে।

### সমাধান: Layers

```
┌──────────────────────────────────────────────────────────────────┐
│                        HTTP REQUEST                               │
│                     (GET /api/users)                              │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                        ROUTE LAYER                                │
│         URL Pattern Matching (GET /users → controller)            │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE LAYER                               │
│         Logging, auth, parsing, validation, errors               │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                               │
│   Request validation, orchestration, response formatting          │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                                 │
│      Business logic: "কী হওয়া উচিত?" (no HTTP)                  │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                  REPOSITORY LAYER                                 │
│           "Database এর সাথে কথা বলো। কীভাবে তা আমার চিন্তা নেই।" │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                        DATABASE                                   │
│              Persistent data storage (PostgreSQL, etc.)          │
└──────────────────────────────────────────────────────────────────┘
```

### প্রতিটা Layer এর দায়িত্ব

#### Route Layer
- **কাজ**: HTTP method + path কে handler function এর সাথে মিলিয়ে দেওয়া।
- **উদাহরণ**: `GET /users/123` → `userController.getUserById` কল করো
- **Code**:
  ```javascript
  router.get('/users/:id', userController.getUserById);
  ```

#### Middleware Layer
- **কাজ**: প্রতিটা request দেখা। একটা specific কাজ করা (log করা, parse করা, auth করা, validate করা)।
- **উদাহরণ**:
  - Logger middleware: Request log করো।
  - `express.json()`: JSON body কে JavaScript object এ পরিণত করো।
  - Auth middleware: JWT valid কিনা দেখো।
  - Error middleware: Error ধরো।
- **Code**:
  ```javascript
  app.use(logger); // প্রতিটা request দেখো
  app.use(express.json()); // JSON parse করো
  app.use(authenticate); // JWT চেক করো
  ```

#### Controller Layer
- **কাজ**: HTTP request handle করো। Input validate করো। Service কল করো। Response format করো।
- **গুরুত্বপূর্ণ নিয়ম**: Controllers এর business logic নেই। তারা শুধু orchestrate করে।
- **Code**:
  ```javascript
  async getUserById(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'ID required' });
    
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    
    res.json(user);
  }
  ```

#### Service Layer
- **কাজ**: Business logic রাখো। সিদ্ধান্ত নাও। অন্য services কে coordinate করো।
- **গুরুত্বপূর্ণ নিয়ম**: Services HTTP জানে না। তারা pure logic।
- **যারা এটা কল করতে পারে**: Controllers, jobs, CLI tools, অন্য services।
- **Code**:
  ```javascript
  async createUser(dto) {
    // Email আগে থেকে আছে কিনা দেখো
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');
    
    // Password hash করো
    const passwordHash = await bcrypt.hash(dto.password, 10);
    
    // User save করো
    const user = await userRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash
    });
    
    // Welcome email পাঠাও (async job হতে পারে)
    await emailService.sendWelcomeEmail(user.email);
    
    return user;
  }
  ```

#### Repository Layer
- **কাজ**: Database access। CRUD operations শুধুমাত্র।
- **গুরুত্বপূর্ণ নিয়ম**: Repositories এর business logic নেই। তারা শুধু query করে।
- **Code**:
  ```javascript
  async findByEmail(email) {
    return db.query('SELECT * FROM users WHERE email = $1', [email]);
  }

  async create(data) {
    return db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.email, data.passwordHash]
    );
  }
  ```

### Layers এর মধ্য দিয়ে ডেটা Flow

Request: `POST /users` with body `{ name: "Alice", email: "alice@example.com", password: "secret" }`

```
1. Route match হয়: POST /users → userController.createUser

2. Middleware চলে:
   - Logger: "POST /users received"
   - express.json(): Body string কে JS object এ convert করে

3. Controller (userController.createUser):
   - req পায় parsed body সহ
   - Validate করে: name এবং email আছে কিনা?
   - Call করে: userService.createUser(req.body)
   - পায় back: service এর কাছ থেকে user object
   - Format করে: passwordHash সরিয়ে দেয় (DTO)
   - Return করে: res.status(201).json(userDTO)

4. Service (userService.createUser):
   - পায়: { name, email, password }
   - Check করে: Email unique কিনা? (userRepository.findByEmail call করে)
   - Hash করে: password → bcrypt → hash
   - Create করে: userRepository.create({ name, email, passwordHash })
   - Send করে: welcome email async এ
   - Return করে: user object

5. Repository (userRepository.create):
   - Run করে: SQL INSERT INTO users (...)
   - Return করে: database থেকে নতুন user

6. ডেটা উপরে উঠে আসে:
   - Service পায় user, return করে
   - Controller পায় user, DTO তে transform করে, response পাঠায়
   - Client পায়: { id, name, email, createdAt } (passwordHash নেই!)
```

---

## Middleware Pipeline

### Middleware কী?

Middleware একটা function যা request handle করার সময় মাঝে চলে। এর তিনটা parameter আছে:

```javascript
(req, res, next) => {
  // কোড এখানে
}
```

- **`req`**: HTTP request object। Headers, body, query params ইত্যাদি আছে।
- **`res`**: HTTP response object। Client কে ডেটা পাঠাতে ব্যবহার করি।
- **`next`**: Function যা আমরা call করি পরবর্তী middleware এ যেতে।

### Middleware Execution Order (Pipeline)

যখন request আসে, middleware যে order এ define করা হয়েছে সেই order এ চলে:

```javascript
app.use(middleware1); // প্রথম চলে
app.use(middleware2); // দ্বিতীয় চলে (যদি middleware1 next() call করে)
app.use(middleware3); // তৃতীয় চলে
app.get('/users', handler); // চতুর্থ চলে (সব middleware next() call করলে)
```

**Visualization**:

```
Request আসে
    ↓
middleware1 চলে → next() call করে
    ↓
middleware2 চলে → next() call করে
    ↓
middleware3 চলে → next() call করে
    ↓
Route handler (controller) চলে
    ↓
Response পাঠায়
```

### গুরুত্বপূর্ণ Rules

1. **যদি middleware next() call করে, পরবর্তী middleware/handler চলবে।**
2. **যদি middleware response পাঠায় (res.json(), res.send()), pipeline থেমে যাবে।**
3. **যদি middleware next() না করে এবং response না পাঠায়, request চিরকালের জন্য ঝুলে থাকবে।**

### সাধারণ Middleware Order

```javascript
// 1. Logging (প্রতিটা request দেখতে হবে)
app.use(logger);

// 2. Body parsing (JSON string কে object এ convert করো)
app.use(express.json());

// 3. Authentication (user logged in আছে কিনা check করো)
app.use(authenticate);

// 4. Authorization (user permission আছে কিনা check করো)
app.use(authorize);

// 5. Routes
app.get('/admin', handler);

// 6. Error handling (সবার শেষে থাকতে হবে!)
app.use(errorHandler);
```

**কেন এই order?**
- Logger প্রথম: সব requests দেখবে, যেগুলো authentication fail ও।
- Parsing দ্বিতীয়: সব পরবর্তী middleware parsed body দেখবে।
- Auth তৃতীয়: ডেটা আছে এখন, check করো user authenticated কিনা।
- Routes: এখন safe সব handler run করতে পারো।
- Error handler শেষে: সব errors catch করবে।

### উদাহরণ: Middleware নিজে বানাও

**Request ID Middleware** (প্রতিটা request এর জন্য unique ID যোগ করে):

```javascript
import { v4 as uuidv4 } from 'uuid';

function requestIdMiddleware(req, res, next) {
  const requestId = uuidv4();
  req.id = requestId; // request object এ attach করো
  res.setHeader('X-Request-ID', requestId); // response headers এ পাঠাও
  console.log(`[${requestId}] ${req.method} ${req.path}`);
  next(); // পরবর্তী middleware এ যাও
}

app.use(requestIdMiddleware);
```

যখন request আসে:
1. Middleware একটা UUID generate করে।
2. `req.id` এ attach করে যাতে পরবর্তী handlers এটা ব্যবহার করতে পারে।
3. Response header এ set করে client এটা দেখতে পারে।
4. `next()` call করে continue করে।

### Error Handling Middleware

Error middleware এর **৪টা parameters** থাকে:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
```

এই middleware run হয় যদি অন্য কোনো middleware error throw করে:

```javascript
app.get('/users', async (req, res, next) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    next(err); // error middleware কে pass করো
  }
});
```

**গুরুত্বপূর্ণ**: Error middleware অবশ্যই শেষের `app.use()` call হতে হবে।

---


## Filtering Response Data

### সমস্যা: Accidental Data Leakage

কল্পনা করো তোমার User database থেকে এই data আসছে:

```javascript
// Database থেকে আসা User object
const userFromDatabase = {
  id: '123',
  name: 'Alice',
  email: 'alice@example.com',
  passwordHash: '$2b$10$...', // কখনও expose করবে না!
  twoFactorSecret: 'JBSWY3DP...', // কখনও expose করবে না!
  lastLoginIp: '192.168.1.1', // Privacy risk
  stripeCustomerId: 'cus_123...' // Internal ID
};
```

যদি এটা সরাসরি client এ পাঠাই:

```javascript
app.get('/users/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user); // ❌ সব sensitive fields পাঠাচ্ছি!
});
```

Response এ sensitive fields থাকবে। Hacker দেখতে পাবে password hash, 2FA secret, সব কিছু।

### সমাধান: Response Data Filtering

Controller-এ response পাঠানোর আগে শুধু safe fields select করো:

```javascript
// Controller
app.get('/users/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  
  // শুধু safe fields select করো (explicit!)
  const safeUserData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
    // passwordHash, twoFactorSecret, stripeCustomerId বাদ দেওয়া হয়েছে
  };
  
  res.json(safeUserData); // Client-কে শুধু এই fields পায়
});
```

Response:

```json
{
  "id": "123",
  "name": "Alice",
  "email": "alice@example.com",
  "createdAt": "2026-01-15T10:00:00Z"
}
```

Sensitive fields কোনো কিছু leak হয়নি।

### Response Data Filtering Pattern

Filtering logic এক জায়গায় রাখো (সাধারণত controller বা utility তে):

```javascript
// utils/response-mapper.js
export function toUserResponse(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
    // Sensitive fields intentionally omitted
  };
}

// Controller
app.get('/users/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(toUserResponse(user));
});
```

**লাভ**: যখন database model-এ নতুন sensitive field যোগ করবে, accidentally expose হবে না কারণ filtering function explicitly safe fields define করে।

---

## HTTP Status Codes (Reference)

### 2xx: সফল

- **200 OK** — Request সফল হয়েছে, response এ ডেটা আছে।
- **201 Created** — রিসোর্স সফলভাবে তৈরি হয়েছে (সাধারণত POST এর জন্য)।
- **204 No Content** — Request সফল, কিন্তু response body নেই (সাধারণত DELETE এর জন্য)।

### 4xx: Client Error

- **400 Bad Request** — Client ভুল বা invalid ডেটা পাঠিয়েছে। উদাহরণ: required fields missing, invalid JSON।
- **401 Unauthorized** — Client authenticated হয়নি। উদাহরণ: JWT token নেই।
- **403 Forbidden** — Client authenticated কিন্তু permission নেই। উদাহরণ: regular user admin endpoint access করছে।
- **404 Not Found** — রিসোর্স নেই। উদাহরণ: User ID 999 নেই।
- **409 Conflict** — Request existing state এর সাথে conflict করছে। উদাহরণ: যে email দিয়ে user তৈরি করছ সেটা আগে থেকে আছে।
- **422 Unprocessable Entity** — Server request বুঝে কিন্তু process করতে পারছে না (validation error)।

### 5xx: Server Error

- **500 Internal Server Error** — সার্ভার error (bug, database down, ইত্যাদি)।
- **503 Service Unavailable** — সার্ভার temporarily unavailable (maintenance, overload)।

---

## Authentication Flow Overview

### সাধারণ Token-Based Auth (JWT)

```
Client                              Server
  │                                   │
  ├─ POST /login                      │
  │ { username: "alice",              │
  │   password: "secret" }            │
  ├──────────────────────────────────→│
  │                        Server validate করে:
  │                        • User exist করে?
  │                        • Password match করে?
  │                        • JWT create করো
  │                                   │
  │                    JWT token      │
  │←──────────────────────────────────┤
  │                                   │
  ├─ GET /users                       │
  │ Headers: {                        │
  │   Authorization: Bearer {JWT}     │
  │ }                                 │
  ├──────────────────────────────────→│
  │                      Server check করে:
  │                      • JWT header এ আছে?
  │                      • JWT valid?
  │                      • Token expired?
  │                      • সব ঠিক থাকলে, ডেটা পাঠাও
  │                                   │
  │               User data response  │
  │←──────────────────────────────────┤
  │                                   │
```

### Auth এর জন্য Middleware

```javascript
function authenticate(req, res, next) {
  // 1. Header থেকে token নিয়ো
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer {token}"
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // 2. Token verify করো
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // User info request এ attach করো
    next(); // পরবর্তী middleware/handler এ যাও
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.use(authenticate); // এই এর পর সব routes auth লাগবে
```

---

## সারসংক্ষেপ

- **HTTP lifecycle**: Request → Middleware → Route → Controller → Service → Repository → Database → Response.
- **Layers**: প্রতিটার একটা কাজ। এক layer এ logic বদলালে অন্যটা অস্পৃষ্ট থাকে।
- **Middleware**: Order এ চলে, next() দিয়ে পরবর্তীতে যায় অথবা response পাঠায়।
- **DTOs**: Explicitly বলো কোন ডেটা বের হবে। Accidental leaks prevent করো।
- **Status codes**: কী হলো তা communicate করো (200, 201, 400, 401, 403, 404, 500)।
- **Architecture**: সাধারণ, predictable, scalable।
