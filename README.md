# Node.js & Express Backend Development Course

**Instructor**: Senior Software Engineer, Tech Company  
**Batch**: MERN Stack Development - Batch 05  
**Duration**: 13-15 classes (Live Classes)  
**Dates**: April 18, 2026 onwards

---

## About This Course

This is a production-grade backend development curriculum designed for engineers building their backend skills. Each class is self-contained, meticulously structured, and grounded in real-world industry practices. You'll build a full-featured Node.js/Express backend from architecture principles to deployment using plain JavaScript and modern ES6+ patterns.

### Prerequisites

- Proficiency in **JavaScript** (functions, objects, async/await, ES6+)
- Recently completed **React JS** course
- Basic **HTTP** and **REST API** concepts
- Terminal/CLI comfort

### How to Use This Repository

1. **Start with your assigned class**: Navigate to `class-1/`, `class-2/`, etc.
2. **Read the README first**: Each class has a dedicated `README.md` with learning objectives, agenda, and asset links.
3. **Follow the flow**: Notes → Demos (run them!) → Exercises → Quiz → Homework.
4. **Set up your environment**: Node 20 LTS recommended. See `.nvmrc` and setup instructions in demo READMEs.

---

## Course Roadmap

| Class | Live # | Topic | Directory | Key Skills |
|-------|--------|-------|-----------|-----------|
| 1 | 59 | Node-Express Introduction | [`class-0/`](#class-1-node-express-intro) | Internet, HTTP, Web |
| 1 | 59 | Node-Express Back End Architecture | [`class-1/`](#class-1-node-express-back-end-architecture) | Layering, DTOs, status codes, auth flow |
| 2 | 60 | Express Project From Scratch + Docker | [`class-2/`](#class-2-express-project-from-scratch--docker) | npm init, env handling, Docker, compose |
| 3 | 61 | Master Request, Response & Middleware | [`class-3/`](#class-3-master-request-response--middleware) | req/res anatomy, middleware order, validation, error handling |
| 4 | 62 | Master MongoDB Query Writing | [`class-4/`](class-4/) | CRUD, filters, projections, aggregation intro |
| 5 | 63 | Master MongoDB Aggregation | [`class-5/`](class-5/) | Aggregation pipeline, stages, $group, $lookup |
| 6 | 64 | Master Mongoose With Express | [`class-6/`](class-6/) | Schema design, relationships, hooks, statics |
| 7 | 65 | JWT Authentication & Security | [`class-7/`](class-7/) | JWT tokens, refresh flow, password hashing, email verification |
| 8 | 66 | Task Manager Backend Project | [`class-8/`](class-8/) | Full CRUD project, users, tasks, filtering |
| 9 | 67 | Inventory Backend Project | [`class-9/`](class-9/) | Stock management, transactions, reports |
| 10 | 68 | Ecommerce Backend + Payment Gateway | [`class-10/`](class-10/) | Cart, orders, Stripe/Razorpay integration |
| 11 | 69 | Redis, Jobs & Queue Management | [`class-11/`](class-11/) | Caching, Bull queues, email jobs, rate limiting |
| 12 | 70 | Server Prep & Deployment (Coolify) | [`class-12/`](class-12/) | CI/CD, environment hardening, Coolify, monitoring |
| 13 | 71 | AI-Driven API Development | [`class-13/`](class-13/) | OpenAI, Gemini, Hugging Face, LLM inference patterns |

---

## Class Overviews

### Class 0: Introduction

**[Go to class-0/ →](class-0/)**

### Class 1: Node-Express Back End Architecture

Learn the foundational patterns that separate junior backends from production code. Understand request flow, layering (routes → controllers → services), DTOs, middleware pipelines, and HTTP semantics.

**[Go to class-1/ →](class-1/)**

### Class 2: Express Project From Scratch + Docker

Scaffold a production-ready Express+JavaScript project from zero. Set up scripts, environment handling, structured logging, Docker containerization, and docker-compose orchestration.

**[Go to class-2/ →](class-2/)**

### Class 3: Master Request, Response & Middleware

Deep dive into Express internals. Master `req`/`res` anatomy, middleware execution order, async error handling, built-in parsers, CORS, security headers, rate limiting, and request validation with Zod.

**[Go to class-3/ →](class-3/)**

---

### Class 4: MongoDB Query Writing

Master MongoDB queries using the native driver. CRUD operations, query operators, projections, pagination, sorting, and indexing fundamentals.

**[Go to class-4/ →](class-4/)**

### Class 5: MongoDB Aggregation

Pipeline-based data processing. Master stages: `$match`, `$group`, `$project`, `$sort`, `$lookup`. Build analytics and reporting queries.

**[Go to class-5/ →](class-5/)**

### Class 6: Mongoose with Express

Object-Document Mapper integration. Schema design, validation, relationships, virtuals, hooks, and methods. Build relational models on MongoDB.

**[Go to class-6/ →](class-6/)**

### Class 7: JWT Auth, Email & Security

Complete authentication flow. Password hashing with bcrypt, JWT access/refresh tokens, email verification with nodemailer, and security hardening (Helmet, rate limiting).

**[Go to class-7/ →](class-7/)**

### Class 8: Task Manager Backend Project

Full multi-user project. Users, lists, tasks, permissions, filtering, pagination. Combines all prior classes into a production-ready app.

**[Go to class-8/ →](class-8/)**

### Class 9: Inventory Backend Project

Stock management system. Products, suppliers, stock movements, transactions with Mongoose sessions, low-stock alerts via aggregation.

**[Go to class-9/ →](class-9/)**

### Class 10: Ecommerce Backend + Stripe

Payment-enabled ecommerce. Shopping carts, orders, Stripe PaymentIntent integration, webhooks, idempotency, order state machines.

**[Go to class-10/ →](class-10/)**

### Class 11: Redis, Jobs & Queue Management

Caching strategies (cache-aside, TTL) and background jobs with BullMQ. Email queues, scheduled jobs, retries, dead-letter queues.

**[Go to class-11/ →](class-11/)**

### Class 12: Server Prep & Deployment (Coolify)

Production deployment. VPS hardening, non-root users, SSH keys, firewalls. Coolify CI/CD, zero-downtime rollouts, monitoring, domain + SSL.

**[Go to class-12/ →](class-12/)**

### Class 13: AI-Driven API Development

LLM integration. OpenAI, Gemini, Hugging Face APIs. Chat completions, streaming, embeddings, prompt engineering, token management, rate limits.

**[Go to class-13/ →](class-13/)**

---

## Repository Structure

```
nodejs-classes/
├── README.md                          ← You are here
├── .nvmrc                             ← Node 20 LTS
├── .editorconfig                      ← Editor consistency
├── .gitignore                         ← Git rules
├── _template/                         ← Canonical class structure (for reference)
├── class-1/
│   ├── README.md                      ← Class objectives & overview
│   ├── slides/
│   │   └── outline.md                 ← Speaker notes & timing
│   ├── notes/
│   │   ├── 01-concepts.md             ← Theory + diagrams
│   │   ├── 02-industry-context.md    ← Real-world patterns
│   │   └── 03-glossary-banglish.md   ← Terms & translations
│   ├── code/
│   │   └── demo-hello-architecture/   ← Runnable JS demo
│   ├── exercises/
│   │   ├── README.md                  ← Problem statements
│   │   ├── starter/                   ← Skeleton code
│   │   └── solutions/                 ← Reference solutions
│   ├── quiz/
│   │   └── quiz.md                    ← 10 MCQs + answers
│   └── homework/
│       └── README.md                  ← Take-home assignment
├── class-2/
│   └── [same structure as class-1]
└── class-3/
    └── [same structure as class-1]
```

---

## Development Environment Setup

### Prerequisites

- **Node.js 20 LTS** (check `.nvmrc`)
- **npm** (or pnpm/yarn) for package management
- **Docker** & **docker-compose** (from class-2 onwards)
- **Git** (for version control)
- **VS Code** recommended

### Quick Start

1. **Clone/open this repo**:

   ```bash
   cd nodejs-classes
   ```

2. **Install Node 20** (if using nvm):

   ```bash
   nvm use
   ```

3. **Navigate to any class and run its demo**:

   ```bash
   cd class-1/code/demo-hello-architecture
   npm install
   npm run dev
   ```

4. **Editor settings**: `.editorconfig` ensures consistent spacing, line endings, and formatting across all demos.

---

## How Each Class Works

### The Flow

1. **README**: Start here. Read objectives, prerequisites, and agenda.
2. **Slides**: Get the speaker outline and timing. Useful if reviewing later.
3. **Notes**: Three markdown files covering concepts, industry context, and terminology.
4. **Code Demos**: Runnable JavaScript. Build & run to see theory in action. Study the code structure.
5. **Exercises**: 3-5 problems. Starter code provided; solutions available for reference.
6. **Quiz**: 10 MCQs to self-assess understanding.
7. **Homework**: One project-oriented task bridging to the next class.

### Quality Standards (SE2-Grade)

- Every demo builds and runs: `npm install && npm run dev` should work out of the box.
- JavaScript ESM modules: Clean modern code with ES6+ syntax and patterns.
- Diagrams: Mermaid flowcharts for non-trivial flows (request lifecycle, auth, etc.).
- Practical insights: "Common Mistakes" and "Interview Questions" in each README.
- Banglish callouts: Key terms translated to Bengali/Banglish where genuinely confusing.

---

## Key Concepts You'll Master

### By End of Class 0

- Internet and Web

### By End of Class 1

- Layered architecture (Routes, Controllers, Services, Repositories)
- Middleware pipeline and execution order
- HTTP request/response cycle
- DTOs and type safety

### By End of Class 3

- Full request parsing and validation
- Custom middleware and error handling
- Async patterns in Express
- Security (CORS, Helmet, rate limiting)

### By End of Class 7

- User authentication with JWT
- Secure password storage
- Refresh token patterns

### By End of Class 13

- Complete production backend with all layers
- Deployment, monitoring, and scaling
- AI-driven API design

---

## Resources

- **Express.js Docs**: [expressjs.com](https://expressjs.com)
- **Node.js Docs**: [nodejs.org](https://nodejs.org)
- **JavaScript Guide**: [developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Docker Docs**: [docs.docker.com](https://docs.docker.com)
- **Postman API Client**: [postman.com](https://www.postman.com)

---

## FAQ

**Q: Do I need to follow classes in order?**  
A: Classes 1-3 are foundational. From class 4, each class builds on class 3, but you can revisit earlier classes for reference.

**Q: What if a demo doesn't run?**  
A: Check Node version (`node -v` should be 20.x), and ensure all deps installed (`npm install`). Each demo's README has troubleshooting.

**Q: Can I modify the demo code?**  
A: Absolutely! Treat demos as learning material. Experiment, break things, and rebuild.

**Q: Where are the solutions?**  
A: In `class-N/exercises/solutions/`. Attempt exercises first, then check solutions.

---

## Notes for Students

- **Consistent code style**: We use ESM modules and modern JavaScript patterns. This ensures clean, readable code.
- **Architecture matters**: Good layering saves 10x effort during refactoring.
- **Test as you go**: Each demo includes basic error checks. Add more as you learn.
- **Ask questions**: These concepts are deep. Use office hours or discussion forums liberally.

---

## Contact & Support

- **Course Updates**: Check the README and class-specific READMEs for announcements.
- **Issues in Demos**: Raise an issue or ask in class.
- **Homework Submission**: Instructions in each class's homework README.

---

Let's build something great. Welcome to Node.js backend development!
