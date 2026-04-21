# Class 1: MERN Stack Backend (Node.js / Express.js)

## Node-Express Backend Architecture

**Anowar Hossain Jeebon**<br>
Senior Software Engineer <br>
Cefalo Bangladesh Ltd. <br>

LinkedIn: <https://www.linkedin.com/in/jeebon/>

---

## Slide 1: আজ কী শিখব

Node.js আর Express দিয়ে scalable backend বানানোর foundation শিখব।

- HTTP request কীভাবে server-এ ঘুরে বেড়ায়
- Architecture pattern যা hobby code-কে production code-এ রূপান্তরিত করে
- Layering কেন গুরুত্বপূর্ণ
- Live demo দিয়ে সবকিছু একসাথে দেখব

---

## Slide 2: একটা HTTP Request-এর যাত্রা

```
Browser পাঠায়: GET /api/users
        ↓
Express request পায়
        ↓
Middleware pipeline চলে
        ↓
Router URL match করে → handler call করে
        ↓
Controller validate করে, Service-কে জিজ্ঞাসা করে
        ↓
Service সিদ্ধান্ত নেয় কী করতে হবে
        ↓
Repository database-এর সাথে কথা বলে
        ↓
Database data return করে
        ↓
Response transform হয়ে browser-এ ফেরত যায়
```

প্রতিটা request এই layers-এর মধ্য দিয়ে একটা journey করে। Layer-গুলো আলাদা কারণ প্রতিটার একটা specific দায়িত্ব আছে।

---

## Slide 3: ৫-Layer Architecture

```
┌─────────────────────────────────────┐
│  REQUEST / RESPONSE (HTTP)          │
├─────────────────────────────────────┤
│  ROUTES (URL → Handler mapping)     │
├─────────────────────────────────────┤
│  MIDDLEWARE (Logging, Auth, Parse)  │
├─────────────────────────────────────┤
│  CONTROLLER (Validate, Orchestrate) │
├─────────────────────────────────────┤
│  SERVICE (Business Logic)           │
├─────────────────────────────────────┤
│  REPOSITORY (Database Layer)        │
├─────────────────────────────────────┤
│  DATABASE (Persistent Storage)      │
└─────────────────────────────────────┘
```

প্রতিটা layer-এর এক কাজ। সবার সাথে এক layer কথা বলে—নিজের পরবর্তী layer-র সাথে।

---

## Slide 4: Routes কী করে?

Routes URL আর HTTP method-কে একটা handler function-এ map করে।

- `GET /users` → সব users fetch করো
- `GET /users/:id` → নির্দিষ্ট user fetch করো
- `POST /users` → নতুন user তৈরি করো
- `PUT /users/:id` → user update করো
- `DELETE /users/:id` → user delete করো

**Ex.:**
```javascript
// routes/users.js
import express from 'express';
import { getAllUsers, getUserById, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

export default router;
```

Route শুধু URL match করে। Controller-এ কী হবে তা ভাবে না।

---

## Slide 5: Middleware কী করে?

Middleware প্রতিটা request-কে দেখে, কাজ করে, তারপর পরবর্তী handler-এ pass করে।

ধরো airport security। প্রতিটা checkpoint একটা middleware:
- **Logger middleware**: প্রতিটা request record করো
- **JSON parser middleware**: String JSON-কে JS object-এ রূপান্তরিত করো
- **Auth middleware**: user logged in কিনা check করো
- **Error handler middleware**: error catch করো এবং response তৈরি করো

**Ex.:**
```javascript
// Middleware registration order গুরুত্বপূর্ণ
app.use(logger);              // ১ম: সবকিছু log করো
app.use(express.json());      // ২য়: JSON parse করো
app.use(authenticate);        // ৩য়: logged in check করো
app.use(authorize);           // ৪র্থ: permission check করো

app.get('/admin', handler);   // এরপর route handler চলে
```

---

## Slide 6: Middleware Order গুরুত্বপূর্ণ কেন?

যদি order ভুল হয়, middleware সঠিক data দেখতে পাবে না।

**খারাপ উদাহরণ:**
```javascript
app.use(authenticate);     // ১ম: auth check করো
app.use(express.json());   // ২য়: JSON parse করো (অনেক দেরি!)

app.post('/users', handler);
```

এখানে `authenticate` middleware যখন চলে, `req.body` এখনো parse হয়নি। এটা `req.body.token` পড়তে চায়, কিন্তু body এখনো string। Result: middleware কিছু পায় না, request reject করে দেয়।

**সঠিক:**
```javascript
app.use(express.json());    // ১ম: JSON parse করো
app.use(authenticate);      // ২য়: এরপর auth check করো

app.post('/users', handler);
```

---

## Slide 7: Error Handler Middleware

Error handling middleware-এর ৪টা parameter থাকে: `err`, `req`, `res`, `next`।

এটা MUST থাকতে হবে app-এর সবচেয়ে শেষে।

**Ex.:**
```javascript
// সব routes আর middleware-এর পরে এটা লিখো
app.use((err, req, res, next) => {
  console.error(err);
  
  // Error type অনুযায়ী response তৈরি করো
  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' });
  } else if (err.status === 401) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

## Slide 8: Controller কী করে?

Controller request-কে নেয়, data validate করে, তারপর Service-কে বলে "এটা করো"।

Controller-এর দায়িত্ব:
- Request data sanity check করো
- Business logic Service-এ push করো
- Service থেকে result পাও
- Response format করে client-কে পাঠাও

**Ex.:**
```javascript
// controllers/userController.js
export async function createUser(req, res, next) {
  try {
    // ১. Validate request data
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({ 
        message: 'Email and name are required' 
      });
    }
    
    // ২. Service call করো
    const newUser = await userService.createUser({
      email: req.body.email,
      name: req.body.name
    });
    
    // ৩. Response পাঠাও
    res.status(201).json(newUser);
  } catch (error) {
    next(error);  // Error handler-এ যাও
  }
}
```

Controller HTTP-কে method calls-এ translate করে।

---

## Slide 9: Service কী করে?

Service-এ business logic থাকে। এটা HTTP-র কথা ভাবে না। এটা শুধু "এই action করতে হলে কী করব?" ভাবে।

Service-এর প্রশ্ন:
- User create করতে হলে password hash করব?
- Email validate করব?
- কোন rule-গুলো check করব?

**Ex.:**
```javascript
// services/userService.js
export async function createUser(userData) {
  // HTTP-র কথা ভাবছি না। শুধু logic.
  
  // Email duplicate? Check করো
  const existing = await userRepository.findByEmail(userData.email);
  if (existing) {
    throw new Error('Email already exists');
  }
  
  // Password hash করো
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  // Database-এ save করো
  return await userRepository.create({
    email: userData.email,
    name: userData.name,
    passwordHash: hashedPassword
  });
}
```

Service reusable। CLI tool বা background job থেকেও call করতে পারো।

---

## Slide 10: Repository কী করে?

Repository শুধু database-এর সাথে কথা বলে।

- `getAll()` — সব data fetch করো
- `getById(id)` — নির্দিষ্ট row fetch করো
- `create(data)` — নতুন row insert করো
- `update(id, data)` — row update করো
- `delete(id)` — row delete করো

**Ex.:**
```javascript
// repositories/userRepository.js
export async function create(userData) {
  // শুধু database logic
  const result = await db.collection('users').insertOne({
    email: userData.email,
    name: userData.name,
    passwordHash: userData.passwordHash,
    createdAt: new Date()
  });
  
  return result;
}

export async function getById(id) {
  return await db.collection('users').findOne({ _id: id });
}
```

আগামীকাল যদি MongoDB-র পরিবর্তে PostgreSQL ব্যবহার করতে হয়, শুধু এই file change করবে।

---

## Slide 11: কেন Layering গুরুত্বপূর্ণ?

**Scenario 1: ছাড়া layering**

সব code একটা file-এ:

```javascript
app.post('/users', async (req, res) => {
  // validation
  // business logic
  // database query
  // response formatting
  // error handling
  // — সবকিছু এক জায়গায়
});
```

যদি "email duplicate check" logic change করতে হয়, প্রতিটা endpoint touch করতে হবে। Database schema change হলে? সব endpoints এর code update করতে হবে। Chaos!

**Scenario 2: Layering দিয়ে**

Service-র মধ্যে logic:

```javascript
// services/userService.js
export async function createUser(userData) {
  const existing = await userRepository.findByEmail(userData.email);
  if (existing) throw new Error('Email already exists');
  // ... rest of logic
}
```

Logic change করতে হলে, শুধু Service change করো। Controller, Route, Repository-র কিছু করার নেই।

**এর মানে:**
- একাধিক developer একসাথে কাজ করতে পারে
- Testing সহজ (Service-কে independently test করতে পারো)
- Code reuse easy (Service-কে HTTP ছাড়াও use করতে পারো)

---

## Slide 12: Status Codes আর তাদের অর্থ

**2xx সফল:**
- **200 OK** — Request সফল হয়েছে, data return করছি
- **201 Created** — নতুন resource তৈরি হয়েছে

**4xx Client Error:**
- **400 Bad Request** — Client garbage data পাঠিয়েছে (validation fail)
- **401 Unauthorized** — Login করতে হবে
- **403 Forbidden** — Login করা আছে, কিন্তু permission নেই
- **404 Not Found** — Resource exist করে না

**5xx Server Error:**
- **500 Internal Server Error** — Server-এ bug আছে বা database down

---

## Slide 13: Status Code ভুল ব্যবহার

**খারাপ:**
```javascript
if (!req.body.email) {
  return res.status(500).json({ message: 'Email missing' });
}
```

**ভালো:**
```javascript
if (!req.body.email) {
  return res.status(400).json({ message: 'Email is required' });
}
```

**কেন?** `500` মানে "server-এর code ভেঙে পড়েছে"। `400` মানে "client bad data পাঠিয়েছে"। Client intelligent react করতে পারবে সঠিক status code দিলে।

---

## Slide 14: Error Response Shape

শুধু status code return করবে না। Error message আর details-ও include করো।

**ভালো error response:**
```javascript
res.status(400).json({
  status: 400,
  message: 'Validation failed',
  errors: {
    email: 'Email is required',
    name: 'Name must be at least 2 characters'
  }
});
```

**খারাপ error response:**
```javascript
res.status(400).json({ error: 'oops' });
```

প্রথম response-এ client বুঝতে পারে কী সমস্যা। দ্বিতীয়টা useless।

---

## Slide 15: Null Check করো

এটা একটা common mistake:

**খারাপ:**
```javascript
const user = await userService.getUserById(id);
res.json(user);  // যদি user null হয়?
```

**ভালো:**
```javascript
const user = await userService.getUserById(id);
if (!user) {
  return res.status(404).json({ message: 'User not found' });
}
res.json(user);
```

সবসময় null check করো database থেকে data fetch করার পর।

---

---

## Slide 16: মনে রাখো

**Key Takeaways:**

1. **Layering production code-র foundation।** Routes, Controller, Service, Repository — প্রতিটার একটা কাজ।

2. **Middleware order গুরুত্বপূর্ণ।** Parse করো auth-এর আগে। Error handler সবার শেষে।

3. **Response data filter করতে হবে।** কখনো raw database models client-কে পাঠাবে না — password hash এবং sensitive fields leak হতে পারে।

4. **Status codes meaningful হতে হবে।** সঠিক code ব্যবহার করলে client intelligent react করতে পারবে।

5. **Services reusable এবং testable।** HTTP-র কথা জানে না। শুধু logic।

---

## Slide 17: পরবর্তীতে?

### আজকের ক্লাসে বাকি আছে

- Temporary data দিয়ে সম্পূর্ণ CRUD demo
- Async programming (async/await, error handling)
- Middleware (logger সহ practical usage)
- DTO ব্যবহার করে data safety নিশ্চিত করা


### Class 2-এ আমরা:
- Validation patterns শিখব (Zod, input sanitization)
- Production-ready Express app বানাব
- Real database integrate করব

এখন একটা প্রশ্ন আছে?
