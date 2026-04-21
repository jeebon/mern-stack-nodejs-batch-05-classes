# Demo: Hello Architecture

A minimal 3-layer Express + JavaScript application demonstrating clean architecture principles.

## Architecture Layers

```
REQUEST (HTTP GET /users)
    ↓
ROUTE (Matches /users endpoint)
    ↓
MIDDLEWARE (Logging)
    ↓
CONTROLLER (Validates input, calls service)
    ↓
SERVICE (Business logic, calls repository)
    ↓
REPOSITORY (In-memory "database")
    ↓
RESPONSE (JSON response)
```

## Directory Structure

```
src/
  ├── main.js                 ← App entry point
  ├── middleware/
  │   └── logger.js           ← Custom middleware
  ├── repositories/
  │   └── userRepository.js   ← Data access layer
  ├── services/
  │   └── userService.js      ← Business logic layer
  ├── controllers/
  │   └── userController.js   ← HTTP handler layer
  └── routes/
      └── users.js            ← URL pattern mapping
```

## Key Concepts Demonstrated

1. **Separation of Concerns**: Each layer has one job
2. **Clear Data Flow**: Request flows through layers (Routes → Controller → Service → Repository)
4. **Middleware Pipeline**: Logging middleware sees every request
5. **Service Reusability**: Services don't know about HTTP, can be called from CLI/jobs/other contexts

## Running the Demo

### Setup

```bash
pnpm install
```

### Development (Auto-reload)

```bash
pnpm dev
```

Server starts on `http://localhost:3000`

### Build & Run

```bash
pnpm build
pnpm start
```

## Testing the API

### Postmane collection: <https://www.postman.com/jeebonco/mern-nodejs-batch-5/collection/p2l5txu/class-1>


### Get All Users

```bash
curl http://localhost:3000/users
```

Response:
```json
[
  { "id": "1", "name": "Alice", "createdAt": "2026-04-18T10:00:00.000Z" },
  { "id": "2", "name": "Bob", "createdAt": "2026-04-18T10:05:00.000Z" }
]
```

### Get Single User

```bash
curl http://localhost:3000/users/1
```

Response:
```json
{ "id": "1", "name": "Alice", "createdAt": "2026-04-18T10:00:00.000Z" }
```

### Create User (Not Found Error)

```bash
curl http://localhost:3000/users/999
```

Response (404):
```json
{ "message": "User not found" }
```

### Create New User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie"}'
```

Response (201):
```json
{ "id": "3", "name": "Charlie", "createdAt": "2026-04-18T10:15:00.000Z" }
```

## Code Flow Example

**Request**: `GET /users/1`

1. **Route Layer** (`routes/users.ts`):
   - Matches `GET /users/:id`
   - Calls `userController.getUserById`

2. **Middleware Layer** (`middleware/logger.ts`):
   - Logs `GET /users/1`
   - Calls `next()`

3. **Controller Layer** (`controllers/userController.ts`):
   - Validates `id` parameter
   - Calls `userService.getUserById(id)`

4. **Service Layer** (`services/userService.ts`):
   - Applies business logic (if any)
   - Calls `userRepository.findById(id)`

5. **Repository Layer** (`repositories/userRepository.ts`):
   - Queries in-memory store
   - Returns user or `null`

6. **Response**:
   - Service returns user to controller
   - Controller transforms to DTO (removes sensitive fields)
   - HTTP response sent: `200 OK` with user JSON

## What to Notice

- **Controllers** handle HTTP; they don't do business logic.
- **Services** have business logic; they don't know about HTTP.
- **Repositories** only query data; they don't decide anything.
- Each layer can be tested independently.
- Changing the database (from in-memory to MongoDB) only requires changing the Repository layer.

## Learning Tips

1. **Add console.logs**: Modify the code to log at each layer. Trace the request flow.
2. **Break things**: Try sending invalid data. See how errors are handled.
3. **Extend it**: Add a new endpoint (e.g., `PUT /users/:id`) following the same pattern.
4. **Inspect types**: Use TypeScript's hover tooltips in VS Code to see inferred types.

## Next Steps

- Study each layer in the code.
- Try to add validation (e.g., name must be non-empty).
- Try to add error handling for duplicate names.

