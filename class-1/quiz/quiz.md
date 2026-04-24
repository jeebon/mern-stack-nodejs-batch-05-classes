# Class 1 Quiz: Node-Express Backend Architecture

**সময়**: ১৫-২০ মিনিট  
**ফরম্যাট**: ১০টি multiple-choice প্রশ্ন  
**পাসিং স্কোর**: ৭০% (৭/১০)

---

## প্রশ্নাবলী

### Q1: Request/Response Cycle

**প্রশ্ন**: একজন ক্লায়েন্ট `GET /users` পাঠায়। নিচের কোনটি request flow সঠিকভাবে বর্ণনা করে?

A) Request → Database → Response  
B) Request → Middleware → Routes → Controller → Service → Repository → Database → Response  
C) Request → Controller → Database → Response  
D) Request → Service → Response  

**উত্তর**: B  
**ব্যাখ্যা**: সম্পূর্ণ flow-এ middleware (logging, auth, parsing), তারপর routes, তারপর layered handlers (controller → service → repository) অন্তর্ভুক্ত থাকে।

---

### Q2: Repository Layer-এর Purpose

**প্রশ্ন**: Repository layer-এর PRIMARY দায়িত্ব কী?

A) ব্যবহারকারী input validation করা এবং error responses পাঠানো  
B) Business logic decide করা (কী ঘটা উচিত)  
C) Database-এ CRUD operations চালানো  
D) HTTP requests এবং responses handle করা  

**উত্তর**: C  
**ব্যাখ্যা**: Repository শুধুমাত্র database-এর সাথে কথা বলে। এটা validate, logic decide, বা HTTP handle করে না।

---

### Q3: Service Layer

**প্রশ্ন**: কেন Service layer HTTP details যেমন status codes বা request bodies রাখা উচিত নয়?

A) কারণ HTTP slow  
B) কারণ Services CLI tools, background jobs, বা অন্যান্য non-HTTP contexts-এ reusable হতে হবে  
C) কারণ Services controllers থেকে faster  
D) কারণ HTTP outdated  

**উত্তর**: B  
**ব্যাখ্যা**: Services business logic যা যেকোনো জায়গা থেকে কাজ করা উচিত (HTTP API, CLI, scheduled job, ইত্যাদি)।

---

### Q4: Middleware Execution Order

**প্রশ্ন**: যদি তোমার এই middleware chain থাকে, কী ঘটবে?

```javascript
app.use(middleware1); // next() call করে
app.use(middleware2); // next() call করে না
app.use(middleware3);
app.get('/route', handler);
```

যদি একটা request আসে, কোনটি execute হবে?

A) সবগুলো (middleware1, 2, 3, handler)  
B) middleware1, তারপর middleware2, তারপর handler  
C) middleware1, তারপর middleware2 শুধুমাত্র  
D) কোনটিই না (infinite loop)  

**উত্তর**: C  
**ব্যাখ্যা**: middleware1 next() call করে → middleware2 চলে। middleware2 next() call করে না, তাই chain থেমে যায়।

---

### Q5: Status Code Meanings

**প্রশ্ন**: `403 Forbidden` এবং `401 Unauthorized`-এর মধ্যে পার্থক্য কী?

A) `403` মানে server crash হয়েছে  
B) `403` মানে "তুমি logged in, কিন্তু permission নেই"  
C) `403` ব্যবহার করা উচিত নয়  
D) `403` মানে "পরে চেষ্টা করো"  

**উত্তর**: B  
**ব্যাখ্যা**: `401` = authenticated নই। `403` = authenticated কিন্তু permission নই।

---

### Q6: Response Data Filtering

**প্রশ্ন**: কেন database থেকে আসা data সরাসরি client-এ পাঠানো উচিত নয়?

A) Database slow  
B) Password hash এবং sensitive fields leak হতে পারে  
C) Client JSON বুঝে না  
D) Internet disconnected থাকে  

**উত্তর**: B  
**ব্যাখ্যা**: Database-এ password hashes, API keys, এবং অন্য sensitive fields থাকে যা কখনো client-কে পাঠানো উচিত না। Controller-এ response পাঠানোর আগে শুধু safe fields select করতে হবে।

---

### Q7: Middleware Order Importance

**প্রশ্ন**: একটা app-এ `authenticate` middleware-কে `express.json()` middleware-এর আগে রাখা হয়েছে:

```javascript
app.use(authenticate);      // ১ম
app.use(express.json());    // २য়
```

এটা কেন সমস্যা হতে পারে?

A) কোন সমস্যা নেই, order matter করে না  
B) authenticate middleware `req.body` access করতে পারবে না (এখনো parse হয়নি)  
C) express.json() কাজ করবে না  
D) সব requests 500 error দেবে  

**উত্তর**: B  
**ব্যাখ্যা**: Middleware সবসময় সঠিক order-এ থাকতে হবে। Parser-কে auth-এর আগে থাকতে হবে যাতে body data পাওয়া যায়।

---

### Q8: Error Handler Middleware

**প্রশ্ন**: Error handler middleware-এর বিশেষ বৈশিষ্ট্য কী?

A) এটা সবচেয়ে প্রথমে থাকতে হবে  
B) এটা ৪টা parameter নেয় (err, req, res, next)  
C) এটা সবসময় `next()` call করতে হবে  
D) এটা GET requests-এর জন্য শুধু work করে  

**উত্তর**: B  
**ব্যাখ্যা**: Error handler middleware-তে ৪টা parameter থাকে যা Express কে বলে এটা একটা error handler। এটা সবসময় সবচেয়ে শেষে থাকে।

---

### Q9: Layering Benefits

**প্রশ্ন**: Layered architecture-এর প্রধান সুবিধা কী?

A) Code সবসময় দ্রুত হয়  
B) প্রতিটা layer আলাদা দায়িত্ব রাখে, তাই একটা layer change করলে বাকিগুলো affect হয় না  
C) একটা ফাইলে সব code থাকে তো ছোট থাকে  
D) Database query-এর প্রয়োজন নেই  

**উত্তর**: B  
**ব্যাখ্যা**: Layering-এ separation of concerns থাকে। যদি business logic change করতে হয়, শুধু Service change করো। Controller বা Repository touch করার দরকার নেই।

---

### Q10: Null Checks in Controllers

**প্রশ্ন**: Database থেকে data fetch করার পর Controller-এ কী করা উচিত?

```javascript
const user = await userService.getUserById(id);
// এখানে কী করব?
res.json(user);
```

A) কোন চেক লাগে না, সরাসরি response পাঠাও  
B) null check করো এবং found না হলে 404 return করো  
C) সবসময় 200 return করো  
D) Database-এ যাও এবং আবার query করো  

**উত্তর**: B  
**ব্যাখ্যা**: সবসময় null check করতে হবে। যদি user না পাওয়া যায়, client-কে proper error response দিতে হবে (`404 Not Found`)।

---

## Answer Key এবং Scoring

| Question | Answer | Score |
|----------|--------|-------|
| Q1 | B | 10 |
| Q2 | C | 10 |
| Q3 | B | 10 |
| Q4 | C | 10 |
| Q5 | B | 10 |
| Q6 | B | 10 |
| Q7 | B | 10 |
| Q8 | B | 10 |
| Q9 | B | 10 |
| **Total** | | **90** |

---

## Scoring Guide

- **90-100**: Outstanding! তুমি সব concept ভালোভাবে বুঝেছ।
- **70-89**: Good! কিছু areas-এ আরো practice দরকার, class notes আবার পড়ো।
- **Below 70**: Review করো। Class 1 slides এবং demo code আবার দেখো, তারপর retake করো।

---

## পরবর্তী ধাপ

- যদি scoring ৭০% উপরে হয়, তুমি Class 2-এর জন্য ready।
- যদি কম হয়, নিচের sections আবার পড়ো:
  - Q1-Q2: `notes/01-concepts.md` — HTTP Lifecycle section
  - Q3-Q4: `notes/01-concepts.md` — Layering section
  - Q5: `notes/01-concepts.md` — Status Codes section
  - Q6: `notes/01-concepts.md` — DTOs section
  - Q7-Q10: `notes/01-concepts.md` — Middleware এবং Controllers section

---

**সবার জন্য শুভকামনা!** 
