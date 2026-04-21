# Class 1: Exercises

Solve these problems to reinforce your understanding of layered architecture.

---

## Exercise 1: Architecture Diagram (Conceptual)

**Difficulty**: Easy  
**Time**: 15 minutes

### Problem

You're building a Todo app backend. The API needs to:
- Get all todos for a user
- Get a single todo by ID
- Create a new todo
- Mark a todo as complete

Draw a layered architecture diagram for this app. Label each layer and explain what happens at each one.

### Solution

See `solutions/exercise-1-diagram.md`

---

## Exercise 2: Refactor a Monolithic App (Code)

**Difficulty**: Medium  
**Time**: 30 minutes

### Problem

You have a one-file Express app (see `starter/exercise-2-monolithic.js`). It handles user CRUD but has everything in one function.

**Task**: Refactor this app into a 3-layer architecture:
- Repository layer: Data access
- Service layer: Business logic
- Controller layer: HTTP handling

Provide:
1. A structured folder layout
2. Each layer separated into its own file
3. Response data filtering for request/response shapes

### Starter Code

See `starter/exercise-2-monolithic.js` — it's intentionally messy!

### Solution

See `solutions/exercise-2/` for a complete refactored example.

---

## Exercise 3: Add Validation & Error Handling (Code)

**Difficulty**: Medium  
**Time**: 25 minutes

### Problem

Take the solution from Exercise 2 (or the class demo `class-1/code/demo-hello-architecture/`) and add:

1. **Input Validation**:
   - Email must be a valid format (rough check: contains `@` and `.`)
   - Password must be at least 8 characters

2. **Error Handling**:
   - Return `400` if validation fails
   - Return `409` (Conflict) if email already exists
   - Return `500` if database fails

3. **Error Response Format**:
   ```json
   {
     "code": "VALIDATION_ERROR",
     "message": "Invalid input",
     "errors": {
       "email": "Invalid email format",
       "password": "Password too short"
     }
   }
   ```

### Starter Code

See `starter/exercise-3/` — contains the demo app with TODOs where you need to add validation.

### Solution

See `solutions/exercise-3/` for a complete example with validation and error handling.

---

## Exercise 4: Middleware Pipeline Order (Conceptual)

**Difficulty**: Easy  
**Time**: 10 minutes

### Problem

You have these middleware functions in your Express app:

1. `loggerMiddleware` — logs requests
2. `jsonParserMiddleware` — parses JSON body
3. `authMiddleware` — checks JWT
4. `errorHandlerMiddleware` — catches errors

What's the **correct order** for these middleware? Why?

Also: What happens if you put `authMiddleware` BEFORE `jsonParserMiddleware`?

### Solution

See `solutions/exercise-4-middleware-order.md`

---

## Submission Guidelines

1. **For Exercise 1, 4, 5** (conceptual): Write your answer as markdown or plain text.
2. **For Exercise 2, 3** (code): Commit your code and describe the changes.
3. **Testing**: Verify your code runs without errors (`npm i && npm run dev`).
4. **Ask if stuck**: These exercises are challenging. Ask in class or during office hours.

