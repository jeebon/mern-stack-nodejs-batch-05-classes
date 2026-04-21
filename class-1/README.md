# Class 1: Node-Express Backend Architecture

**Live Class**: 59  
**Duration**: 90 minutes  
**Difficulty**: Beginner (কিন্তু production system-এ প্রয়োজনীয়)

---

## এই Class-এ কী শিখবো?

এই class শেষ হলে আপনি পারবেন:

1. **HTTP request lifecycle বুঝবেন** — client থেকে database, তারপর response back।
2. **Layered architecture pattern master করবেন** (Routes → Controllers → Services → Repositories) এবং কেন এটা important।
3. **Middleware execution order চিনবেন** — middleware-গুলো কোন order-এ চলে, সেটা বুঝবেন।
4. **Response data filter করবেন** JavaScript objects দিয়ে, sensitive field-গুলো client-এ না পাঠিয়ে।
5. **HTTP status codes সঠিকভাবে use করবেন** (200, 201, 400, 401, 403, 404, 500, etc.)।
6. **Authentication flow sketch করবেন** — কোন layer কী করে, সেটা clear করবেন।
7. **API testing tools use করতে পারবেন** — Postman, Bruno ইত্যাদি।

---

## এই Class-এ আসার আগে যা জানা থাকা দরকার

- JavaScript-এ async/await এবং Promise use করতে পারেন
- React JS course complete করেছেন
- HTTP methods (GET, POST, PUT, DELETE) এবং REST basics জানেন
- Terminal/CLI commands-এ comfortable আছেন

---

## Class Schedule (90 minutes)

| সময় | Topic | কী হবে |
|------|-------|----------|
| 0:00 - 0:05 | Intro: Architecture কেন দরকার? | Slide walkthrough |
| 0:05 - 0:25 | HTTP Lifecycle ও Layering | Diagrams দেখাব, explain করব |
| 0:25 - 0:40 | Live Demo: একটা app এর layers | `demo-hello-architecture/` run করব, request follow করব |
| 0:40 - 0:55 | Middleware Pipeline বিস্তারিত | Middleware order, কে কখন run হয় |
| 0:55 - 1:10 | Status Codes এবং Error Handling | Common mistakes showcase করব |
| 1:10 - 1:25 | Data shapes organize করা | JavaScript objects দিয়ে কীভাবে |
| 1:25 - 1:30 | Q&A এবং Homework Preview | সবাই প্রশ্ন করতে পারবেন |

---

## এই Class-এর Materials

### Slides এবং Notes পড়বেন
- [Speaker Outline](./slides/outline.md) — বিস্তারিত talking points ও timing
- [01: Core Concepts](./notes/01-concepts.md) — Layering, middleware, request/response lifecycle
- [02: Industry Context](./notes/02-industry-context.md) — Real companies কীভাবে backend structure করে

### Code Demo
- [demo-hello-architecture/](./code/demo-hello-architecture/) — একটা complete working Express + JavaScript example

### Assessment (পরীক্ষা ও homework)
- [Exercises](./exercises/) — একটা messy app refactor করবেন, নিজে একটা architecture design করবেন
- [Quiz](./quiz/quiz.md) — 10 MCQ questions — class-এর concepts test করবেন
- [Homework](./homework/) — Task Manager app-এর জন্য architecture design করবেন (বিস্তারিত instructions homework folder-এ)

---

## Quick Start দ্রুত শুরু করো

### Demo Run করা

```bash
cd code/demo-hello-architecture
npm install
npm run dev
```

App `http://localhost:3000` address-এ চলতে শুরু করবে। এই request গুলো try করো:
- `GET /users` — সব users দেখবে
- `GET /users/:id` — নির্দিষ্ট একজন user দেখবে
- `POST /users` JSON body দিয়ে — নতুন user তৈরি করবে

Console এবং code structure দেখে বুঝবে যে layers কীভাবে কাজ করছে।

---

## Key Concepts at a Glance

### Layered Architecture

```
Request
  ↓
Routes (URL matching, HTTP method)
  ↓
Middleware (logging, auth, parsing)
  ↓
Controllers (request validation, orchestration)
  ↓
Services (business logic)
  ↓
Repositories (database queries)
  ↓
Database
```

Each layer has a single responsibility. Changes to business logic (Service) don't require touching database code (Repository) or request handling (Controller).

### Middleware Pipeline মিডলওয়্যারের লাইন

Middleware functions গুলো একের পর এক execute হয়। প্রতিটি middleware এমন দেখায়:

```javascript
// middleware function এর format
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next(); // পরবর্তী middleware-এ যাবে
};
```

Common middleware-গুলো:
- **Logging**: কোন request এসেছে track করা
- **Parsing**: `express.json()` দিয়ে request body-কে JavaScript object-এ বদলানো
- **Authentication**: JWT token check করা
- **Validation**: request data valid কিনা দেখা
- **Error handling**: error catch করে সুন্দর response দেওয়া

### Response Data Filtering রেসপন্স ডেটা ফিল্টারিং

Database থেকে আসা data সরাসরি client-এ পাঠানো যায় না। Password hash, tokens এবং অন্য sensitive fields leak হতে পারে।

```javascript
// Database থেকে আসা User
const userFromDatabase = {
  id: '123',
  email: 'amina@example.com',
  passwordHash: '$2a$10$...', // Client-কে দেবেন না!
  createdAt: new Date('2024-01-15')
};

// Client-কে পাঠানোর জন্য শুধু safe fields
const userForClient = {
  id: '123',
  email: 'amina@example.com',
  createdAt: new Date('2024-01-15')
  // passwordHash বাদ দেওয়া হয়েছে intentionally
};
```

এই approach use করলে sensitive data leak হওয়ার chance থাকে না।

### Status Codes Cheat Sheet হিসেবের চেটশীট

- `200` OK — Request ঠিকমতো successful হয়েছে
- `201` Created — নতুন resource তৈরি হয়েছে
- `400` Bad Request — Client-এর request-এ সমস্যা আছে
- `401` Unauthorized — লগইন করা লাগবে, এখনো authenticated না
- `403` Forbidden — লগইন করা আছেন, কিন্তু permission নাই
- `404` Not Found — যা খুঁজছিলেন এটা নেই
- `500` Internal Server Error — Server-এর bug আছে, আমাদের সমস্যা

---

## Common Mistakes সাধারণ ভুল

1. **Layering skip করা** → Code spaghetti-র মতো গোলমেলে হয়ে যায়, test-ও কঠিন।
2. **Middleware order ভুল করা** → CORS middleware-কে authentication-এর পরে রাখলে cross-origin request টুটে যায়।
3. **Concerns mix করা** → Controller-এ সরাসরি database query করলে coupling বাড়ে, change করা কঠিন।
4. **Sensitive data leak করা** → Response data filter না করলে password hash client-কে চলে যায়। Security breach!
5. **সব error-এর জন্য 500 দেওয়া** → Debugging এর সময় কী হয়েছে বুঝা যায় না।

---

## Interview-Style Questions সাক্ষাতে আসতে পারে এমন প্রশ্ন

1. **Controller এবং Service-কে আলাদা রাখবেন কেন?**
   - *উত্তর*: Service-এ business logic থাকে, Controller HTTP-র কাজ করে। এভাবে করলে Service-কে CLI, background job, বা অন্য জায়গায়ও reuse করতে পারবেন।

2. **যদি middleware A `next()` call করে এবং middleware B পরে থাকে, তাহলে কী হয়?**
   - *উত্তর*: Middleware B execute হয়। B যদি `next()` call করে, তার পরেরটা চলে — এভাবে chain-এর নিচে flow হয়।

3. **কখন 403 return করবেন, 401-র বদলে?**
   - *উত্তর*: 401 = "লগইন করো না।" 403 = "লগইন করা আছে কিন্তু permission নাই।"

---

## আজকের মূল শিক্ষা

**ভালো architecture হলো বিরক্তিকর architecture।** এটা clever হওয়ার চেষ্টা করে না। প্রতিটা layer একটা কাজ করে, flow predictable। এই predictability-ই team-কে ৫ engineer থেকে ৫০ engineer-এ scale করতে দেয়।

---

## 📖 পরবর্তী ধাপ গুলো

1. **Slides পড়ো** — `slides/outline.md` দেখো পুরো outline-র জন্য।
2. **Notes study করো** — গভীর বুঝাপড়া আছে `notes/` folder-এর তিনটা file-এ।
3. **Demo নিয়ে খেলো** — Code modify করো, ভাঙো, আবার বানাও। এভাবেই শেখা হয়।
4. **Exercises করো** — নিজে কিছু build করো যা শিখেছ।
5. **Quiz দাও** — নিজেকে test করো, বুঝা হয়েছে কিনা দেখো।
6. **Homework শেষ করো** — পরের class-এর জন্য ready হয়ে যাবে।

---

## Banglish Glossary

> **নোট**: যদি এই শর্তাবলী বিভ্রান্তিকর মনে হয়, নীচে দেখুন।

| English | Banglish | Explanation |
|---------|----------|-------------|
| **Layering** | লেয়ারিং / স্তর | ছোট, আলাদা দায়িত্বের অংশে কোড ভাগ করা। যেমন খাবার রেসিপিতে উপাদান আলাদা থাকে। |
| **Middleware** | মিডলওয়্যার | অনুরোধের পথে কাজ করে এমন ফাংশন। লগইন চেক করা বা ডেটা পরিবর্তন করা মিডলওয়্যার করতে পারে। |
| **Route** | রুট | URL এবং HTTP পদ্ধতির মেলবন্ধন (যেমন `GET /users`)। |
| **Controller** | কন্ট্রোলার | অনুরোধ পায়, ডেটা চেক করে, সার্ভিস ডাকে, উত্তর দেয়। |
| **Service** | সার্ভিস | ব্যবসায়িক লজিক - কী করতে হবে তা সিদ্ধান্ত নেয়। |
| **Repository** | রিপোজিটরি | ডাটাবেসের সাথে কথা বলে - ডেটা পড়া/লেখা। |

---

## সাহায্য লাগলে

- **কোনো জায়গায় stuck আছো?** Notes বা demo code আবার দেখো, তারপর class-এ question করো।
- **Demo চলছে না?** Node version check করো (`node -v` হতে হবে 20.x), তারপর demo folder-এ `npm install` করো।
- **আরো গভীর শিখতে চাও?** "Industry Context" note-এ advanced patterns আছে, সেখানে দেখো।
