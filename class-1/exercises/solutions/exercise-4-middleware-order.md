# Exercise 4 Solution: Middleware Pipeline Order

## Correct Order

```typescript
1. Logger Middleware        ← First: logs all requests
2. JSON Parser Middleware   ← Second: parses body so next middleware sees parsed data
3. Auth Middleware         ← Third: checks JWT (body is now available)
4. Route Handlers          ← Fourth: controllers
5. Error Handler           ← Fifth (and last!): catches errors from all above
```

### Code Example

```typescript
app.use(loggerMiddleware);        // 1
app.use(jsonParserMiddleware);    // 2
app.use(authMiddleware);          // 3
app.use(routesRouter);            // 4
app.use(errorHandlerMiddleware);  // 5 - MUST be last
```

---

## Why This Order?

### 1. Logger First
- **Reason**: We want to log EVERY request, including failed auth attempts.
- **If it were later**: Failed auth requests wouldn't be logged.

### 2. Parser Second
- **Reason**: Auth middleware (next step) might need to read the body.
- **If it were later**: Auth middleware sees `req.body` as undefined → can't validate credentials.

### 3. Auth Third
- **Reason**: After parsing, we check if the user is logged in.
- **If it were later**: Unauthorized users would still reach route handlers.

### 4. Routes Fourth
- **Reason**: If auth passed, handle the request.

### 5. Error Handler Last
- **Reason**: Express recognizes error handlers by their 4-parameter signature: `(err, req, res, next)`.
- **If it's not last**: Errors from later middleware/routes won't reach it.

---

## What If Auth Comes Before Parser?

```typescript
app.use(loggerMiddleware);
app.use(authMiddleware);          // ❌ BEFORE parser!
app.use(jsonParserMiddleware);
```

### Scenario

**Request**: `POST /login` with body `{ email: "alice@example.com", password: "secret" }`

1. Logger runs → logs the request
2. Auth middleware runs:
   - Tries to read `req.body.email`
   - But `req.body` hasn't been parsed yet! Still a string.
   - Auth sees `undefined` → rejects with 401
3. JSON parser never gets to run
4. Client gets: `401 Unauthorized` even though they sent valid credentials!

**Result**: Auth fails because the body wasn't parsed yet.

---

## Critical: Error Handler MUST Be Last

```typescript
// ❌ WRONG
app.use(errorHandlerMiddleware);  // Too early!
app.use(routes);                  // Errors from routes won't be caught

// ✅ CORRECT
app.use(routes);
app.use(errorHandlerMiddleware);  // Last!
```

### Why?

Error middleware has the signature: `(err, req, res, next) => {}`

Express only recognizes a handler as an error handler if it has **exactly 4 parameters**. And it only reaches error handlers if they're registered AFTER the code that throws the error.

---

## Summary: The Golden Rule

**Parse → Auth → Routes → Error Handler**

1. **Parse** input first (so everyone has valid `req.body`)
2. **Authenticate** second (who are you?)
3. **Authorize** third (what can you do?)
4. **Handle routes** fourth (do the work)
5. **Catch errors** last (if anything went wrong)

